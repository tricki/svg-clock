import { h, Component, Element, Method, Prop, State, Watch } from '@stencil/core';
import { getHoursAngle, getMinutesAngle, getSecondsAngle } from '../../utils/calculateAngle';
import { supportsCSSTransformsOnSVG } from '../../utils/supportsCSSTransformsOnSVG';
import { getMillisecondsToNextSecond } from '../../utils/getMillisecondsToNextSecond';
import { timeStringToDate } from '../../utils/timeStringToDate';

@Component({
  tag: 'svg-clock',
  styleUrl: 'svg-clock.css'
})
export class SvgClock {

  /**
   * The timeout used to start the interval at the start of the next second or minute.
   */
  timeoutId: number;

  /**
   * The interval responsible for the "ticking" of the clock.
   */
  intervalId: number;

  /**
   * Interaction observer to detect if the clock is visible.
   */
  io: IntersectionObserver;

  /**
   * Check whether the current browser supports CSS transforms on SVG elements.
   *
   * @see https://caniuse.com/#feat=transforms2d
   */
  supportsCSSTransformsOnSVG: boolean = supportsCSSTransformsOnSVG();

  /**
   * Map of the clock hand elements.
   */
  elHands: { [key: string]: SVGElement };

  /**
   * The host element.
   */
  @Element() el: HTMLSvgClockElement;

  /**
   * The URL to load the SVG from.
   */
  @Prop() src: string;

  /**
   * Automatically start the clock.
   */
  @Prop() autoplay: boolean = false;

  /**
   * The interval to check the time. Decrease for smoother animation and
   * increased performance cost. Will be ignored if `time` is set.
   */
  @Prop() interval: number = 1000;

  /**
   * Set a specific time to display. This will disable the automatic ticking.
   * You can pass either a `Date` object or a string in format `hh[:mm[:ss]]`.
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
    }

    if (typeof this.time === 'string') {
      this.currentDate = timeStringToDate(this.time);
    }

    this.tick();
  }

  /**
   * Disable precision. Precision adjusts the rotation of a value (e.g. hours) depending on a lower level value (e.g. minutes).
   */
  @Prop() disablePrecision: boolean = false;

  @Watch('disablePrecision')
  disablePrecisionChanged() {
    this.tick();
  }

  /**
   * The time that the clock is currently set to.
   */
  @State() currentDate: Date;

  /**
   * Whether the hour hand should rotate once in 24 hours instead of every 12 hours.
   */
  @State() hours24: boolean = false;

  /**
   * Whether the clock
   */
  @State() stopped: boolean = true;

  /**
   * Whether the clock is paused, for example because it is not visible.
   */
  @State() paused: boolean = false;

  @Watch('paused')
  pausedChanged() {
    if (!this.paused && !this.stopped) {
      this.start();
    } else {
      this.pause();
    }
  }

  /**
   * The center of the hands used in the SVG `transform` attribute.
   * Required for supporting IE11 and Edge <17.
   */
  @State() svgRotationOrigins: { [key: string]: string };

  /**
   * The SVG of the clock to show. Will be populated based on the `src` property.
   */
  @State() svg: string;

  /**
   * Whether the clock is currently running.
   */
  @State() isCurrentlyRunning: boolean = false;

  /**
   * Start the animation.
   */
  @Method()
  async start() {
    if (this.isCurrentlyRunning || !!this.time) {
      return;
    }

    this.stopped = false;

    if (!this.paused) {
      this.isCurrentlyRunning = true;
      this.tick();
      this.startInterval();
    }
  }

  /**
   * Stop the animation.
   */
  @Method()
  async stop() {
    this.pause();

    this.stopped = true;
  }

  /**
   * Determine whether the clock is running.
   */
  @Method()
  async isRunning(): Promise<boolean> {
    return this.isCurrentlyRunning;
  }

  async componentWillLoad() {
    document.addEventListener('visibilitychange', this.visibilityChanged);

    this.timeChanged();

    let loadingPromise = Promise.resolve();

    if (this.src) {
      loadingPromise = this.loadExternalSvg();
    } else {
      this.initSvg();
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
    document.removeEventListener('visibilitychange', this.visibilityChanged);
    this.io && this.io.disconnect();
  }

  async init() {
    this.initSvg();

    if (this.autoplay) {
      this.start();
    } else {
      // prepare the date value for the renderer
      this.tick();
    }
  }

  /**
   * Start an interval at the start of the next second or minute depending on `interval`.
   */
  startInterval() {
    const timeout = getMillisecondsToNextSecond(this.interval >= 60000);

    this.timeoutId = window.setTimeout(() => {
      this.tick();

      this.intervalId = window.setInterval(() => this.tick(), this.interval);
    }, timeout);
  }

  async loadExternalSvg() {
    this.svg = await (await fetch(this.src)).text();
  }

  initSvg() {
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

  pause() {
    if (!this.isCurrentlyRunning) {
      return;
    }

    window.clearTimeout(this.timeoutId);
    window.clearInterval(this.intervalId);
    this.timeoutId = null;
    this.intervalId = null;

    this.isCurrentlyRunning = false;
  }

  visibilityChanged = () => {
    if (document.hidden && !this.isCurrentlyRunning) {
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

    let hoursPrecision = !this.disablePrecision;
    let minutesPrecision = !this.disablePrecision;

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
