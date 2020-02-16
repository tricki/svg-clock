/**
 * Get the version of the current Edge browser or `null` or other browsers.
 *
 * @export
 * @returns {number}
 */
export function getEdgeVersion(): number {
  const match = navigator.userAgent.match(/Edge\/(\d+)/i);

  if (!match || !match[1]) {
    return null;
  }

  return +match[1];
}
