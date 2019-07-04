# svg-clock



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                                                                                       | Type      | Default     |
| ------------------ | ------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `autoplay`         | `autoplay`          | Automatically start the clock.                                                                                                    | `boolean` | `false`     |
| `disablePrecision` | `disable-precision` | Disable precision. Precision adjusts the rotation of a value (e.g. hours) depending on a lower level value (e.g. minutes).        | `boolean` | `false`     |
| `interval`         | `interval`          | The interval to check the time. Decrease for smoother animation and increased performance cost. Will be ignored if `time` is set. | `number`  | `1000`      |
| `src`              | `src`               | Define a URL to load the SVG from. Combining this with inline SVG will result in untested behavior.                               | `string`  | `undefined` |


## Methods

### `isRunning() => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`



### `start() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `stop() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
