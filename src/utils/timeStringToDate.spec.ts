import { timeStringToDate } from "./timeStringToDate";

describe('timeStringToDate', () => {
  it('returns the correct time', () => {
    expect(timeStringToDate('1')).toEqual(new Date(0, 0, 0, 1));
    expect(timeStringToDate('1:13')).toEqual(new Date(0, 0, 0, 1, 13));
    expect(timeStringToDate('1:13:45')).toEqual(new Date(0, 0, 0, 1, 13, 45));

    expect(timeStringToDate('14')).toEqual(new Date(0, 0, 0, 14));
    expect(timeStringToDate('14:21')).toEqual(new Date(0, 0, 0, 14, 21));
    expect(timeStringToDate('14:21:59')).toEqual(new Date(0, 0, 0, 14, 21, 59));
  });
});
