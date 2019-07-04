import { getMillisecondsToNextSecond } from "./getMillisecondsToNextSecond";

describe('getMillisecondsToNextSecond', () => {
  const date1 = new Date(1, 1, 2000, 15, 15, 15, 250);
  const date2 = new Date(1, 1, 2000, 17, 28, 42, 420);

  it('returns correct number of milliseconds to next second', () => {
    expect(getMillisecondsToNextSecond(false, date1)).toEqual(1000 - 250);
    expect(getMillisecondsToNextSecond(false, date2)).toEqual(1000 - 420);
  });

  it('returns correct number of milliseconds to next minute', () => {
    expect(getMillisecondsToNextSecond(true, date1)).toEqual(1000 - 250 + (1000 * (60 - 15 - 1)));
    expect(getMillisecondsToNextSecond(true, date2)).toEqual(1000 - 420 + (1000 * (60 - 42 - 1)));
  });
});
