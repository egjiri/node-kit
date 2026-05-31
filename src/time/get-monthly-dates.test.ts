import { getMonthlyDates } from './get-monthly-dates';
import type { Cases } from 'testing';

describe('getMonthlyDates', () => {
  const cases: Cases<typeof getMonthlyDates> = [
    ['returns monthly dates for day 15 within a 3-month period', [15, '2025-01-01', '2025-03-31'], [
      '2025-01-15', // January 15
      '2025-02-15', // February 15
      '2025-03-15', // March 15
    ]],
    ['returns monthly dates for day 31 handling month-end limits', [31, '2025-01-01', '2025-04-30'], [
      '2025-01-31', // January 31
      '2025-02-28', // February 28 (end of month limit)
      '2025-03-31', // March 31
      '2025-04-30', // April 30 (end of month limit)
    ]],
    ['returns monthly dates for day 29 in leap year February', [29, '2024-02-01', '2024-02-29'], [
      '2024-02-29', // February 29 (leap year)
    ]],
    ['returns monthly dates for day 30 handling February', [30, '2025-02-01', '2025-04-30'], [
      '2025-02-28', // February 28 (end of month limit)
      '2025-03-30', // March 30
      '2025-04-30', // April 30
    ]],
    ['returns single date when start and end are in same month', [10, '2025-06-01', '2025-06-30'], [
      '2025-06-10', // June 10
    ]],
    ['returns empty array when no dates fall within range', [15, '2025-01-16', '2025-01-31'], []],
    ['handles start date after the target day of month', [5, '2025-01-10', '2025-02-28'], [
      '2025-02-05', // February 5 (January 5 is before start date)
    ]],
    ['handles year rollover', [31, '2025-12-01', '2026-02-28'], [
      '2025-12-31', // December 31
      '2026-01-31', // January 31 of next year
      '2026-02-28', // February 28 of next year (end of month limit)
    ]],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = getMonthlyDates(...args);
    expect(actual).toEqual(expected);
  });
});
