import { getHoursAngle, getMinutesAngle, getSecondsAngle } from './calculateAngle';

describe('calculateAngle', () => {
  const date1 = new Date(1, 1, 2000, 15, 15, 15, 250);
  const date2 = new Date(1, 1, 2000, 17, 28, 42, 420);

  /** START HOURS */
  it('returns correct default precision hours angle', () => {
    expect(getHoursAngle(date1, false)).toEqual(360 / 12 * 3);
    expect(getHoursAngle(date2, false)).toEqual(360 / 12 * 5);
  });

  it('returns correct high precision hours angle', () => {
    expect(getHoursAngle(date1)).toEqual((360 / 12 * (15 % 12)) + (360 / 12 / 4));
    expect(getHoursAngle(date2)).toEqual((360 / 12 * (17 % 12)) + (360 / 12 / (60 / 28)));
  });

  it('returns correct default precision 24 hours angle', () => {
    expect(getHoursAngle(date1, false, true)).toEqual(360 / 24 * 15);
    expect(getHoursAngle(date2, false, true)).toEqual(360 / 24 * 17);
  });

  it('returns correct high precision 24 hours angle', () => {
    expect(getHoursAngle(date1, true, true)).toEqual((360 / 24 * 15) + (360 / 24 / 4));
    expect(getHoursAngle(date2, true, true)).toEqual((360 / 24 * 17) + (360 / 24 / (60 / 28)));
  });
  /** END HOURS */

  /** START MINUTES */
  it('returns correct default precision minutes angle', () => {
    expect(getMinutesAngle(date1, false)).toEqual(360 / 60 * 15);
    expect(getMinutesAngle(date2, false)).toEqual(360 / 60 * 28);
  });

  it('returns correct high precision minutes angle', () => {
    expect(getMinutesAngle(date1, true)).toEqual((360 / 60 * 15) + (360 / 60 * (15 / 60)));
    expect(getMinutesAngle(date2, true)).toEqual((360 / 60 * 28) + (360 / 60 * (42 / 60)));
  });
  /** END MINUTES */

  /** START SECONDS */
  it('returns correct default precision seconds angle', () => {
    expect(getSecondsAngle(date1, false)).toEqual(360 / 60 * 15);
    expect(getSecondsAngle(date2, false)).toEqual(360 / 60 * 42);
  });

  it('returns correct high precision seconds angle', () => {
    expect(getSecondsAngle(date1)).toEqual((360 / 60 * 15) + (360 / 60 * (250 / 1000)));
    expect(getSecondsAngle(date2)).toEqual((360 / 60 * 42) + (360 / 60 * (420 / 1000)));
  });
  /** END SECONDS */
});
