import { addDays } from './add-days';
import type { CalendarDate } from './types';

type DateCase = [string, [Date, number], Date];
type CalendarDateCase = [string, [CalendarDate, number], CalendarDate];

describe('addDays', () => {
  const cases: CalendarDateCase[] = [
    ['add positive days', ['2025-01-15', 5], '2025-01-20'],
    ['add zero days', ['2025-01-15', 0], '2025-01-15'],
    ['subtract days', ['2025-01-15', -10], '2025-01-05'],
    ['roll over month end', ['2025-01-31', 1], '2025-02-01'],
    ['roll over year end', ['2025-12-31', 1], '2026-01-01'],
    ['handle leap year Feb 28 -> Feb 29', ['2024-02-28', 1], '2024-02-29'],
    ['handle non-leap year Feb 28 -> Mar 1', ['2025-02-28', 1], '2025-03-01'],
    ['preserve years below 100', ['0099-12-31', 1], '0100-01-01'],
  ];

  describe('Date input', () => {
    test.each(cases.map(toDateCase))('%s', (_, args, expected) => {
      const actual = addDays(...args);
      expect(actual.getTime()).toBe(expected.getTime());
    });

    test.each([
      ['spring-forward transition', '2025-03-08', '2025-03-09'],
      ['fall-back transition', '2025-11-01', '2025-11-02'],
    ])('preserves local wall-clock time and the input across the %s', (_, start, expected) => {
      const date = new Date(`${start}T12:34:56.789`);
      const actual = addDays(date, 1);
      expect(actual).toEqual(new Date(`${expected}T12:34:56.789`));
      expect(date).toEqual(new Date(`${start}T12:34:56.789`));
    });
  });

  describe('CalendarDate input', () => {
    test.each(cases)('%s', (_, args, expected) => {
      const actual = addDays(...args);
      expect(actual).toBe(expected);
    });
  });
});

function toDateCase([label, [calendarDate, days], expected]: CalendarDateCase): DateCase {
  return [label, [new Date(calendarDate), days], new Date(expected)];
}
