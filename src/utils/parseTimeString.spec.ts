import { parseTimeString } from "./parseTimeString";

describe('parseTimeString', () => {
  it('returns the correct time', () => {
    expect(parseTimeString('1')).toEqual(new Date(0, 0, 0, 1));
    expect(parseTimeString('1:13')).toEqual(new Date(0, 0, 0, 1, 13));
    expect(parseTimeString('1:13:45')).toEqual(new Date(0, 0, 0, 1, 13, 45));

    expect(parseTimeString('14')).toEqual(new Date(0, 0, 0, 14));
    expect(parseTimeString('14:21')).toEqual(new Date(0, 0, 0, 14, 21));
    expect(parseTimeString('14:21:59')).toEqual(new Date(0, 0, 0, 14, 21, 59));
  });
});
