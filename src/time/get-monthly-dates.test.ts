import { getMonthlyDates } from './get-monthly-dates';
import type { Cases } from 'testing';

describe('getMonthlyDates', () => {
  const cases: Cases<typeof getMonthlyDates> = [
    ['returns monthly dates for day 15 within a 3-month period', [15, new Date(2025, 0, 1), new Date(2025, 2, 31)], [
      new Date(2025, 0, 15), // January 15
      new Date(2025, 1, 15), // February 15
      new Date(2025, 2, 15), // March 15
    ]],
    ['returns monthly dates for day 31 handling month-end limits', [31, new Date(2025, 0, 1), new Date(2025, 3, 31)], [
      new Date(2025, 0, 31), // January 31
      new Date(2025, 1, 28), // February 28 (end of month limit)
      new Date(2025, 2, 31), // March 31
      new Date(2025, 3, 30), // April 30 (end of month limit)
    ]],
    ['returns monthly dates for day 29 in leap year February', [29, new Date(2024, 1, 1), new Date(2024, 1, 29)], [
      new Date(2024, 1, 29), // February 29 (leap year)
    ]],
    ['returns monthly dates for day 30 handling February', [30, new Date(2025, 1, 1), new Date(2025, 3, 30)], [
      new Date(2025, 1, 28), // February 28 (end of month limit)
      new Date(2025, 2, 30), // March 30
      new Date(2025, 3, 30), // April 30
    ]],
    ['returns single date when start and end are in same month', [10, new Date(2025, 5, 1), new Date(2025, 5, 30)], [
      new Date(2025, 5, 10), // June 10
    ]],
    ['returns empty array when no dates fall within range', [15, new Date(2025, 0, 16), new Date(2025, 0, 31)], []],
    ['handles start date after the target day of month', [5, new Date(2025, 0, 10), new Date(2025, 1, 28)], [
      new Date(2025, 1, 5), // February 5 (January 5 is before start date)
    ]],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = getMonthlyDates(...args);
    expect(actual).toEqual(expected);
  });
});
