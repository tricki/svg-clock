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
  supportsCSSTransformsOnSVG: boolean = supportsCSSTransformsOnSVG();

  elHands: { [key: string]: SVGElement };

  @Element() el: HTMLSvgClockElement;

  /**
   * Automatically start the clock.
   *
   * @type {boolean}
   */
  @Prop() autoplay: boolean = false;

  /**
   * The interval to check the time. Decrease for smoother animation and
   * increased performance cost.
   *
   * @type {number}
   * @memberof SvgClock
   */
  @Prop() interval: number = 1000;

  /**
   * The center of the hands used in the SVG `transform` attribute.
   * Required for supporting IE11 and Edge <17.
   *
   * @type {string}
   * @memberof SvgClock
   */
  @Prop() svgRotationOrigin: string = '132.278 164.621';

  @State() currentDate: Date;

  @State() paused: boolean = false;

  @Watch('paused')
  pausedChanged() {
    if (!this.paused) {
      this.start();
    } else {
      this.stop();
    }
  }

  @Method()
  async start() {
    if (this._isRunning() || this.paused) {
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

  @Method()
  async stop() {
    if (!this._isRunning()) {
      return;
    }

    window.clearInterval(this.intervalId);
    this.intervalId = null;
  }

  @Method()
  async isRunning() {
    return this._isRunning();
  }

  componentWillLoad() {
    this.visibilityListener = this.visibilityChanged.bind(this);
    document.addEventListener('visibilitychange', this.visibilityListener);

    this.elHands = {
      hours: this.el.querySelector('svg #hours'),
      minutes: this.el.querySelector('svg #minutes'),
      seconds: this.el.querySelector('svg #seconds'),
    };

    if (this.autoplay) {
      this.start();
    } else {
      // prepare the date value for the renderer
      this.tick();
    }
  }

  componentDidUnload() {
    this.stop();
    document.removeEventListener('visibilitychange', this.visibilityListener);
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

  tick() {
    this.currentDate = new Date();

    if (this.supportsCSSTransformsOnSVG) {
      this.elHands.hours.style.transform = `rotateZ(${getHoursAngle(this.currentDate)}deg)`;
      this.elHands.minutes.style.transform = `rotateZ(${getMinutesAngle(this.currentDate)}deg)`;
      this.elHands.seconds.style.transform = `rotateZ(${getSecondsAngle(this.currentDate, this.interval < 1000)}deg)`;
    } else {
      this.elHands.hours.setAttribute('transform', `rotate(${getHoursAngle(this.currentDate)} ${this.svgRotationOrigin})`);
      this.elHands.minutes.setAttribute('transform', `rotate(${getMinutesAngle(this.currentDate)} ${this.svgRotationOrigin})`);
      this.elHands.seconds.setAttribute('transform', `rotate(${getSecondsAngle(this.currentDate, this.interval < 1000)} ${this.svgRotationOrigin})`);
    }
  }

  render() {
    return [
        <slot />,
    ];
  }
}
