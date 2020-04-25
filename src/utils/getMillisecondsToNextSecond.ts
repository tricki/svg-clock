/**
 * Get the number of milliseconds to the next second.
 */
export function getMillisecondsToNextSecond(date = new Date()) {
  return 1000 - date.getMilliseconds();
}
