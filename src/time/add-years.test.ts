import { addYears } from './add-years';
import { calendarDateToLocalDate } from './calendar-date';
import type { CalendarDate } from './types';

type DateCase = [string, [Date, number], Date];
type CalendarDateCase = [string, [CalendarDate, number], CalendarDate];

describe('addYears', () => {
  const cases: CalendarDateCase[] = [
    ['add positive years', ['2025-01-15', 5], '2030-01-15'],
    ['add zero years', ['2025-01-15', 0], '2025-01-15'],
    ['subtract years', ['2025-01-15', -10], '2015-01-15'],
    ['handle leap year Feb 29 -> stays Feb 29 when resulting year is leap', ['2024-02-29', 4], '2028-02-29'],
    ['handle leap year Feb 29 -> shifts to Feb 28 when resulting year not leap', ['2024-02-29', 1], '2025-02-28'],
    ['preserve years below 100', ['0099-12-31', 1], '0100-12-31'],
  ];

  describe('Date input', () => {
    test.each(cases.map(toDateCase))('%s', (_, args, expected) => {
      const actual = addYears(...args);
      expect(actual.getTime()).toBe(expected.getTime());
    });

    test('preserves local wall-clock time and the input', () => {
      const date = new Date(2024, 1, 29, 23, 34, 56, 789);
      const original = new Date(date);
      const actual = addYears(date, 1);
      expect(actual).toEqual(new Date(2025, 1, 28, 23, 34, 56, 789));
      expect(date).toEqual(original);
    });
  });

  describe('CalendarDate input', () => {
    test.each(cases)('%s', (_, args, expected) => {
      const actual = addYears(...args);
      expect(actual).toBe(expected);
    });
  });
});

function toDateCase([label, [calendarDate, years], expected]: CalendarDateCase): DateCase {
  return [label, [calendarDateToLocalDate(calendarDate), years], calendarDateToLocalDate(expected)];
}
