import { getMillisecondsToNextSecond } from './getMillisecondsToNextSecond';

describe('getMillisecondsToNextSecond', () => {
  const date1 = new Date(1, 1, 2000, 15, 15, 15, 250);
  const date2 = new Date(1, 1, 2000, 17, 28, 42, 420);

  it('returns correct number of milliseconds to next second', () => {
    expect(getMillisecondsToNextSecond(date1)).toEqual(1000 - 250);
    expect(getMillisecondsToNextSecond(date2)).toEqual(1000 - 420);
  });
});
