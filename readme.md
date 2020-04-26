![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# SVG Clock

This web component allows you to include an animated analog clock in any website, regardless of framework. Just pass it a prepared SVG and it will animate it. You can use one of the provided clocks or [prepare your own SVG](#preparing-svg).

## Usage

First, pick a prepared SVG clock or [create your own](#preparing-svg).

Then set the URL in the `src` attribute, which will load it asynchronously (which is recommended since it allows the SVG file to be cached by the browser):

```html
<svg-clock src="..."></svg-clock>
```

Alternatively, you can inline the SVG:

```html
<svg-clock>
  <svg>...</svg>
</svg-clock>
```

## Performance
`svg-clock` uses the `visibilitychange` event and `document.hidden` as well as `IntersectionObserver` (if supported) to pause the clock while it is hidden and restart it once it's visible.

## Browser support

This component is built with [Stencil](https://stenciljs.com/) and inherits [the same browser support](https://stenciljs.com/docs/browser-support) (Chrome 60+, Safari 10.1+, Firefox 63+, Edge 16+, and IE11).

But because IE11 and Edge 16 (but not Edge 17+) [don't allow CSS transforms on SVG elements](https://caniuse.com/#search=transform) we use a fallback using the [SVG transform origin attribute](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform) which needs to be defined (in the `data-transform-origin` attribute of each clock hand).

## Using this component

See [Stencil's documentation](https://stenciljs.com/docs/overview).

# <a name="preparing-svg"></a>Preparing an SVG
There are a couple things you need to do to prepare an SVG clock:
- All hands need to be in the 12 o'clock position (pointing straight up).
- Ensure the hand elements have IDs of `hours` (or `hours-24`), `minutes` and optionally `seconds`.
  - `hours` will take 12 hours to rotate 360°, `hours-24` will take 24 hours.
- Ensure those elements have no `transform` property since it would interfere with the animation.
- Add the correct CSS `transform-origin` definition as inline style (e.g. `<g id="minutes" style="transform-origin: 50% 50%">`)
- For IE11 and Edge 16 support, determine the correct SVG transform origin (for the `transform` property) and set it as the `data-transform-origin` attribute.

If you don't know how to find the correct transform-origin (CSS **or** SVG) we recommend initializing the clock so all hands point straight down (6:30:30 with disabled precision). Then adjust the origin (using browser DevTools) until the hands are in the correct position.

Example to test all hands at once:

```html
<svg-clock disable-precision time="6:30:30" src="..."></svg-clock>
```

## Contributing

To start contributing, clone this repo to a new directory:

```bash
git clone https://github.com/tricki/svg-clock.git svg-clock
cd svg-clock
```

and run:

```bash
npm install
npm start
```

To build the component for production, run:

```bash
npm run build
```

To run the tests, run:

```bash
npm test
```
