/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface SvgClock {
    /**
    * Automatically start the clock.
    */
    'autoplay': boolean;
    /**
    * Disable precision. Precision adjusts the rotation of a value (e.g. hours) depending on a lower level value (e.g. minutes).
    */
    'disablePrecision': boolean;
    /**
    * The interval to check the time. Decrease for smoother animation and increased performance cost.
    */
    'interval': number;
    'isRunning': () => Promise<boolean>;
    /**
    * Define a URL to load the SVG from. Combining this with inline SVG will result in untested behavior.
    */
    'src': string;
    'start': () => Promise<void>;
    'stop': () => Promise<void>;
  }
}

declare global {


  interface HTMLSvgClockElement extends Components.SvgClock, HTMLStencilElement {}
  var HTMLSvgClockElement: {
    prototype: HTMLSvgClockElement;
    new (): HTMLSvgClockElement;
  };
  interface HTMLElementTagNameMap {
    'svg-clock': HTMLSvgClockElement;
  }
}

declare namespace LocalJSX {
  interface SvgClock extends JSXBase.HTMLAttributes<HTMLSvgClockElement> {
    /**
    * Automatically start the clock.
    */
    'autoplay'?: boolean;
    /**
    * Disable precision. Precision adjusts the rotation of a value (e.g. hours) depending on a lower level value (e.g. minutes).
    */
    'disablePrecision'?: boolean;
    /**
    * The interval to check the time. Decrease for smoother animation and increased performance cost.
    */
    'interval'?: number;
    /**
    * Define a URL to load the SVG from. Combining this with inline SVG will result in untested behavior.
    */
    'src'?: string;
  }

  interface IntrinsicElements {
    'svg-clock': SvgClock;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


