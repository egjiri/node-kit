import { calendarDateToLocalDate } from './calendar-date';
import { format } from './format';
import type { CalendarDate } from './types';

type DateCase = [string, [Date], string];
type CalendarDateCase = [string, [CalendarDate], string];

describe('format', () => {
  const cases: CalendarDateCase[] = [
    ['formats a standard date', ['2025-01-15'], 'Wed, Jan 15, 2025'],
    ['formats month end', ['2025-01-31'], 'Fri, Jan 31, 2025'],
    ['formats year end', ['2025-12-31'], 'Wed, Dec 31, 2025'],
    ['formats leap-year date', ['2024-02-29'], 'Thu, Feb 29, 2024'],
    ['formats non-leap-year date', ['2025-02-28'], 'Fri, Feb 28, 2025'],
    ['preserves years below 100', ['0099-12-31'], 'Thu, Dec 31, 99'],
  ];

  describe('Date input', () => {
    test.each(cases.map(toDateCase))('%s', (_, args, expected) => {
      const actual = format(...args);
      expect(actual).toBe(expected);
    });

    it('formats in the provided time zone', () => {
      const actual = format(new Date(Date.UTC(2025, 0, 1, 1)), 'America/Los_Angeles');
      expect(actual).toBe('Tue, Dec 31, 2024');
    });

    it('formats a non-midnight Date using its local calendar date', () => {
      const actual = format(new Date(2024, 1, 29, 23, 59, 59, 999));
      expect(actual).toBe('Thu, Feb 29, 2024');
    });
  });

  describe('CalendarDate input', () => {
    test.each(cases)('%s', (_, args, expected) => {
      const actual = format(...args);
      expect(actual).toBe(expected);
    });
  });
});

function toDateCase([label, [calendarDate], expected]: CalendarDateCase): DateCase {
  return [label, [calendarDateToLocalDate(calendarDate)], expected];
}
