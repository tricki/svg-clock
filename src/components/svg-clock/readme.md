# svg-clock



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute             | Description                                                                                               | Type      | Default             |
| ------------------- | --------------------- | --------------------------------------------------------------------------------------------------------- | --------- | ------------------- |
| `autoplay`          | `autoplay`            | Automatically start the clock.                                                                            | `boolean` | `false`             |
| `interval`          | `interval`            | The interval to check the time. Decrease for smoother animation and increased performance cost.           | `number`  | `1000`              |
| `svgRotationOrigin` | `svg-rotation-origin` | The center of the hands used in the SVG `transform` attribute. Required for supporting IE11 and Edge <17. | `string`  | `'132.278 164.621'` |


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
