/**
 * Parse a time string into a `Date` object.
 *
 * @export
 * @param {string} timeString A string in the format 'hh[:mm[:ss]]
 * @returns The parsed `Date` object.
 */
export function parseTimeString(timeString: string) {
  const [hours, minutes, seconds, milliseconds] = timeString.split(':').map(v => +v);

  return new Date(null, null, null, hours, minutes || 0, seconds || 0, milliseconds || 0)
}
