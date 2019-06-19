export function getHoursAngle(date: Date, highPrecision: boolean = true) {
  let angle = date.getHours() * 30;

  if (highPrecision) {
    angle += date.getMinutes() / 2;
  }

  return angle;
}

export function getMinutesAngle(date: Date, highPrecision: boolean = false) {
  let angle = date.getMinutes() * 6;

  if (highPrecision) {
    angle += date.getSeconds() / 10;
  }

  return angle;
}

export function getSecondsAngle(date: Date, highPrecision: boolean = true) {
  let angle = date.getSeconds() * 6;

  if (highPrecision) {
    angle += date.getMilliseconds() / 1000 * 6;
  }

  return angle;
}
