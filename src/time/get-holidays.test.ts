import { getHolidayDates, getHolidays, getOntarioHolidays } from '.';

describe('getHolidays', () => {
  it('returns a list of holidays', () => {
    const actual = getHolidays();
    const expected = [
      "New Year's Day",
      'Family Day',
      'Good Friday',
      'Easter Monday',
      'Victoria Day',
      'Canada Day',
      'Civic Holiday',
      'Labour Day',
      'National Day for Truth and Reconciliation',
      'Thanksgiving',
      'Remembrance Day',
      'Christmas Day',
      'Boxing Day',
    ];
    expect(actual).toEqual(expected);
  });
});

describe('getOntarioHolidays', () => {
  it('returns a list of Ontario holidays', () => {
    const actual = getOntarioHolidays();
    const expected = [
      "New Year's Day",
      'Family Day',
      'Good Friday',
      'Victoria Day',
      'Canada Day',
      'Civic Holiday',
      'Labour Day',
      'Thanksgiving',
      'Christmas Day',
      'Boxing Day',
    ];
    expect(actual).toEqual(expected);
  });
});

describe('getHolidayDates', () => {
  it('returns correct holiday dates for 2025', () => {
    const actual = getHolidayDates(2025);
    const expected = {
      "New Year's Day": new Date(2025, 0, 1),
      'Family Day': new Date(2025, 1, 17),
      'Good Friday': new Date(2025, 3, 18),
      'Easter Monday': new Date(2025, 3, 21),
      'Victoria Day': new Date(2025, 4, 19),
      'Canada Day': new Date(2025, 6, 1),
      'Civic Holiday': new Date(2025, 7, 4),
      'Labour Day': new Date(2025, 8, 1),
      'National Day for Truth and Reconciliation': new Date(2025, 8, 30),
      Thanksgiving: new Date(2025, 9, 13),
      'Remembrance Day': new Date(2025, 10, 11),
      'Christmas Day': new Date(2025, 11, 25),
      'Boxing Day': new Date(2025, 11, 26),
    };
    expect(actual).toEqual(expected);
  });

  it('returns correct Victoria Day when May 25 falls on Monday (edge case)', () => {
    const actual = getHolidayDates(2026)['Victoria Day'];
    const expected = new Date(2026, 4, 18);
    expect(actual).toEqual(expected);
  });
});
