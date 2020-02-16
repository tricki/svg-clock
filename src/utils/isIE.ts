/**
 * Check if the current browser is Internet Explorer.
 *
 * @export
 * @returns {boolean}
 */
export function isIE(): boolean {
  return -1 !== window.navigator.userAgent.indexOf('Trident');
}
