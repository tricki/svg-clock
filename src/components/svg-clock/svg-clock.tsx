import { h, Component, Element, Method, Prop, State, Watch } from '@stencil/core';
import { getHoursAngle, getMinutesAngle, getSecondsAngle } from '../../utils/calculateAngle';
import { supportsCSSTransformsOnSVG } from '../../utils/supportsCSSTransformsOnSVG';
import { getMillisecondsToNextSecond } from '../../utils/getMillisecondsToNextSecond';

@Component({
  tag: 'svg-clock',
  styleUrl: 'svg-clock.css'
})
export class SvgClock {

  intervalId: number;
  visibilityListener: () => void;
  io: IntersectionObserver;
  supportsCSSTransformsOnSVG: boolean = supportsCSSTransformsOnSVG();

  elHands: { [key: string]: SVGElement };

  @Element() el: HTMLSvgClockElement;

  /**
   * Define a URL to load the SVG from. Combining this with inline SVG will result in untested behavior.
   *
   * @type {string}
   * @memberof SvgClock
   */
  @Prop() src: string;

  /**
   * Automatically start the clock.
   *
   * @type {boolean}
   */
  @Prop() autoplay: boolean = false;

  /**
   * The interval to check the time. Decrease for smoother animation and
   * increased performance cost. Will be ignored if `time` is set.
   *
   * @type {number}
   * @memberof SvgClock
   */
  @Prop() interval: number = 1000;

  /**
   * Set a specific time to display. This will disable the automatic ticking.
   * You can pass either a `Date` object or a string in format `hh:mm:ss`.
   *
   * @type {(string | Date)}
   * @memberof SvgClock
   */
  @Prop() time: string | Date;

  @Watch('time')
  timeChanged() {
    if (!this.time) {
      return;
    }

    this.stop();

    if (this.time instanceof Date) {
      this.currentDate = this.time;
      return;
    }

    if (typeof this.time === 'string') {
      const [hours, minutes, seconds, milliseconds] = this.time.split(':').map(v => +v);

      this.currentDate = new Date(null, null, null, hours, minutes || 0, seconds || 0, milliseconds || 0)
      this.tick();
    }
  }

  /**
   * Disable precision. Precision adjusts the rotation of a value (e.g. hours) depending on a lower level value (e.g. minutes).
   *
   * @type {boolean}
   * @memberof SvgClock
   */
  @Prop() disablePrecision: boolean = false;

  @State() currentDate: Date;

  @State() hours24: boolean = false;

  @State() paused: boolean = false;

  @Watch('paused')
  pausedChanged() {
    if (!this.paused) {
      this.start();
    } else {
      this.stop();
    }
  }

  /**
   * The center of the hands used in the SVG `transform` attribute.
   * Required for supporting IE11 and Edge <17.
   *
   * @type {string}
   * @memberof SvgClock
   */
  @State() svgRotationOrigins: { [key: string]: string };

  @State() svg;

  /**
   * Start the animation.
   *
   * @returns
   * @memberof SvgClock
   */
  @Method()
  async start() {
    if (this._isRunning() || this.paused || !!this.time) {
      return;
    }

    this.tick();
    this.startInterval();
  }

  /**
   * Start an interval at the start of the next second or minute.
   *
   * @memberof SvgClock
   */
  startInterval() {
    const timeout = getMillisecondsToNextSecond(this.interval >= 60000);

    setTimeout(() => {
      this.tick();

      this.intervalId = window.setInterval(() => this.tick(), this.interval);
    }, timeout);
  }

  /**
   * Stop the animation.
   *
   * @returns
   * @memberof SvgClock
   */
  @Method()
  async stop() {
    if (!this._isRunning()) {
      return;
    }

    window.clearInterval(this.intervalId);
    this.intervalId = null;
  }

  /**
   * Determine whether the clock is running.
   *
   * @returns
   * @memberof SvgClock
   */
  @Method()
  async isRunning() {
    return this._isRunning();
  }

  async componentWillLoad() {
    this.visibilityListener = this.visibilityChanged.bind(this);
    document.addEventListener('visibilitychange', this.visibilityListener);

    this.timeChanged();

    let loadingPromise = Promise.resolve();

    if (this.src) {
      loadingPromise = this.loadExternalSvg();
    } else {
      this.loadSvg();
    }

    await loadingPromise;

    if (!this.src) {
      // only initialize if no external SVG has to be loaded first
      this.init();
    }
  }

  componentDidLoad() {
    if (this.src) {
      // initialize after external SVG was rendered
      this.init();
    }

    if ('IntersectionObserver' in window) {
      this.io = new IntersectionObserver(this.intersectionChanged.bind(this), {
        threshold: [0, 1]
      });
      this.io.observe(this.el);
    }
  }

  componentDidUnload() {
    this.stop();
    document.removeEventListener('visibilitychange', this.visibilityListener);
    this.io.disconnect();
  }

  async init() {
    this.loadSvg();

    if (this.autoplay) {
      this.start();
    } else {
      // prepare the date value for the renderer
      this.tick();
    }
  }

  async loadExternalSvg() {
    this.svg = await (await fetch(this.src)).text();
  }

  loadSvg() {
    let elHours: SVGElement = this.el.querySelector('svg #hours-24');

    this.hours24 = !!elHours;

    if (!this.hours24) {
      elHours = this.el.querySelector('svg #hours');
    }

    this.elHands = {
      hours: elHours,
      minutes: this.el.querySelector('svg #minutes'),
      seconds: this.el.querySelector('svg #seconds'),
    };

    this.svgRotationOrigins = {
      hours: this.elHands.hours.getAttribute('data-transform-origin'),
      minutes: this.elHands.minutes.getAttribute('data-transform-origin'),
      seconds: this.elHands.seconds && this.elHands.seconds.getAttribute('data-transform-origin'),
    };
  }

  _isRunning() {
    return !!this.intervalId;
  }

  visibilityChanged() {
    if (document.hidden && !this._isRunning()) {
      // not running => do nothing
      return;
    }

    this.paused = document.hidden;
  }

  intersectionChanged(entries?: IntersectionObserverEntry[]) {
    if (!entries || !entries[0]) {
      return;
    }

    this.paused = entries[0].intersectionRatio === 0;
  }

  tick() {
    if (!this.elHands || !this.elHands.hours) {
      return;
    }

    if (!this.time) {
      this.currentDate = new Date();
    }

    let hoursPrecision = true;
    let minutesPrecision = false;

    if (this.disablePrecision) {
      hoursPrecision = false;
    }

    if (this.supportsCSSTransformsOnSVG) {
      this.elHands.hours.style.transform = `rotateZ(${getHoursAngle(this.currentDate, hoursPrecision, this.hours24)}deg)`;
      this.elHands.minutes.style.transform = `rotateZ(${getMinutesAngle(this.currentDate, minutesPrecision)}deg)`;

      if (this.elHands.seconds) {
        this.elHands.seconds.style.transform = `rotateZ(${getSecondsAngle(this.currentDate, this.interval < 1000)}deg)`;
      }
    } else {
      this.elHands.hours.setAttribute('transform', `rotate(${getHoursAngle(this.currentDate, hoursPrecision, this.hours24)} ${this.svgRotationOrigins.hours})`);
      this.elHands.minutes.setAttribute('transform', `rotate(${getMinutesAngle(this.currentDate, minutesPrecision)} ${this.svgRotationOrigins.minutes})`);

      if (this.elHands.seconds) {
        this.elHands.seconds.setAttribute('transform', `rotate(${getSecondsAngle(this.currentDate, this.interval < 1000)} ${this.svgRotationOrigins.seconds})`);
      }
    }
  }

  render() {
    return [
      this.svg && <span innerHTML={this.svg}></span>,
      <slot />,
    ];
  }
}
