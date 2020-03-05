# svg-clock



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                                                                                                        | Type             | Default     |
| ------------------ | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ----------- |
| `autoplay`         | `autoplay`          | Automatically start the clock.                                                                                                                     | `boolean`        | `false`     |
| `disablePrecision` | `disable-precision` | Disable precision. Precision adjusts the rotation of a value (e.g. hours) depending on a lower level value (e.g. minutes).                         | `boolean`        | `false`     |
| `interval`         | `interval`          | The interval to check the time. Decrease for smoother animation and increased performance cost. Will be ignored if `time` is set.                  | `number`         | `1000`      |
| `src`              | `src`               | The URL to load the SVG from.                                                                                                                      | `string`         | `undefined` |
| `time`             | `time`              | Set a specific time to display. This will disable the automatic ticking. You can pass either a `Date` object or a string in format `hh[:mm[:ss]]`. | `Date \| string` | `undefined` |


## Methods

### `isRunning() => Promise<boolean>`

Determine whether the clock is running.

#### Returns

Type: `Promise<boolean>`



### `start() => Promise<void>`

Start the animation.

#### Returns

Type: `Promise<void>`



### `stop() => Promise<void>`

Stop the animation.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
