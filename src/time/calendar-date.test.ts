import { isValidCalendarDate, toCalendarDate } from './calendar-date';
import type { Cases } from 'testing';

describe('toCalendarDate', () => {
  const cases: Cases<typeof toCalendarDate> = [
    ['formats a date as YYYY-MM-DD', [new Date('2025-07-15T12:00:00.000Z')], '2025-07-15'],
    ['formats dates using UTC date components by default', [new Date('2025-01-01T04:59:59.000Z')], '2025-01-01'],
    ['formats dates using the provided time zone', [new Date('2025-01-01T04:59:59.000Z'), 'America/Toronto'], '2024-12-31'],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = toCalendarDate(...args);
    expect(actual).toBe(expected);
  });
});

describe('isValidCalendarDate', () => {
  const cases: Cases<typeof isValidCalendarDate> = [
    ['returns true for a valid calendar date', ['2025-01-01'], true],
    ['returns true for February 29 in a leap year', ['2024-02-29'], true],
    ['returns false for February 29 in a non-leap year', ['2025-02-29'], false],
    ['returns false for day after a 30-day month', ['2025-04-31'], false],
    ['returns false for day 00', ['2025-01-00'], false],
    ['returns false for month 00', ['2025-00-01'], false],
    ['returns false for month 13', ['2025-13-01'], false],
    ['returns false when month is not two digits', ['2025-1-01'], false],
    ['returns false when day is not two digits', ['2025-01-1'], false],
    ['returns false for non-calendar-date format', ['01/01/2025'], false],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = isValidCalendarDate(...args);
    expect(actual).toBe(expected);
  });
});
