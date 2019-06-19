import { h, Component, Element, Method, Prop, State, Watch } from '@stencil/core';
import { getHoursAngle, getMinutesAngle, getSecondsAngle } from '../../utils/calculateAngle';

@Component({
  tag: 'svg-clock',
  styleUrl: 'svg-clock.css'
})
export class SvgClock {

  intervalId: number;
  visibilityListener: () => void;

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
    this.intervalId = window.setInterval(() => this.tick(), this.interval);
  }

  @Method()
  async stop() {
    if(!this._isRunning()) {
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
    if(document.hidden && !this._isRunning()) {
      // not running => do nothing
      return;
    }

    this.paused = document.hidden;
  }

  tick() {
    this.currentDate = new Date();

    this.elHands.hours.style.transform = `rotateZ(${getHoursAngle(this.currentDate)}deg)`;
    this.elHands.minutes.style.transform = `rotateZ(${getMinutesAngle(this.currentDate)}deg)`;
    this.elHands.seconds.style.transform = `rotateZ(${getSecondsAngle(this.currentDate, this.interval < 1000)}deg)`;
  }

  render() {
    return [
        <slot />,
    ];
  }
}
