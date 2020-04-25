import { getMillisecondsToNextSecond } from './getMillisecondsToNextSecond';

export function getMillisecondsToNextMinute(date = new Date()) {
  let timeout = getMillisecondsToNextSecond(date);

  // add time to start of next minute
  return timeout + ((60 - date.getSeconds() - 1) * 1000);
}
