import { getHolidayDates, getHolidays, getOntarioHolidays } from './get-holidays';

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
      "New Year's Day": '2025-01-01',
      'Family Day': '2025-02-17',
      'Good Friday': '2025-04-18',
      'Easter Monday': '2025-04-21',
      'Victoria Day': '2025-05-19',
      'Canada Day': '2025-07-01',
      'Civic Holiday': '2025-08-04',
      'Labour Day': '2025-09-01',
      'National Day for Truth and Reconciliation': '2025-09-30',
      Thanksgiving: '2025-10-13',
      'Remembrance Day': '2025-11-11',
      'Christmas Day': '2025-12-25',
      'Boxing Day': '2025-12-26',
    };
    expect(actual).toEqual(expected);
  });

  it('returns correct Victoria Day when May 25 falls on Monday (edge case)', () => {
    const actual = getHolidayDates(2026)['Victoria Day'];
    expect(actual).toBe('2026-05-18');
  });
});
