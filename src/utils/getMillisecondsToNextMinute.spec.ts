import { getMillisecondsToNextMinute } from './getMillisecondsToNextMinute';

describe('getMillisecondsToNextMinute', () => {
  const date1 = new Date(1, 1, 2000, 15, 15, 15, 250);
  const date2 = new Date(1, 1, 2000, 17, 28, 42, 420);

  it('returns correct number of milliseconds to next minute', () => {
    expect(getMillisecondsToNextMinute(date1)).toEqual(1000 - 250 + (1000 * (60 - 15 - 1)));
    expect(getMillisecondsToNextMinute(date2)).toEqual(1000 - 420 + (1000 * (60 - 42 - 1)));
  });
});
