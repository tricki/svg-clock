import { isIE } from "./isIE";
import { getEdgeVersion } from "./getEdgeVersion";

/**
 * Check for browser support of CSS transforms on SVG elements.
 *
 * @see https://github.com/eprev/eprev.org/issues/15
 * @export
 * @returns {boolean}
 */
export function supportsCSSTransformsOnSVG(): boolean {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 2 2');
  svg.style.position = 'absolute';
  svg.style.top = '0px';
  svg.style.left = '0px';
  svg.style.width = '2px';
  svg.style.height = '2px';
  svg.innerHTML = '<rect width="1" height="1" style="transform: translate(1px, 1px)"/>';
  document.body.appendChild(svg);
  const result = document.elementFromPoint(1, 1) !== svg;
  svg.parentNode.removeChild(svg);

  if (result && (isIE() || (null !== getEdgeVersion() && getEdgeVersion() <= 17))) {
    // browser sniffing because of false positives
    return false;
  }

  return result;
}
