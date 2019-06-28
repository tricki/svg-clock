export function getMillisecondsToNextSecond(toNextMinute: boolean = false, date = new Date()) {
  let timeout = 1000 - date.getMilliseconds();

  if (toNextMinute) {
    // add time to start of next minute
    timeout += (60 - date.getSeconds() - 1) * 1000;
  }

  return timeout;
}
