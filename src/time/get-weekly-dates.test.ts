import { getWeeklyDates } from './get-weekly-dates';
import { DayOfWeek } from './types';
import type { Cases } from 'testing';

describe('getWeeklyDates', () => {
  const cases: Cases<typeof getWeeklyDates> = [
    ['returns all Mondays in January 2025', [DayOfWeek.Monday, '2025-01-01', '2025-01-31'], [
      '2025-01-06', // January 6, 2025 (Monday)
      '2025-01-13', // January 13, 2025 (Monday)
      '2025-01-20', // January 20, 2025 (Monday)
      '2025-01-27', // January 27, 2025 (Monday)
    ]],
    ['returns all Fridays in February 2025', [DayOfWeek.Friday, '2025-02-01', '2025-02-28'], [
      '2025-02-07', // February 7, 2025 (Friday)
      '2025-02-14', // February 14, 2025 (Friday)
      '2025-02-21', // February 21, 2025 (Friday)
      '2025-02-28', // February 28, 2025 (Friday)
    ]],
    ['returns all Sundays when start date is already a Sunday', [DayOfWeek.Sunday, '2025-01-05', '2025-01-19'], [
      '2025-01-05', // January 5, 2025 (Sunday)
      '2025-01-12', // January 12, 2025 (Sunday)
      '2025-01-19', // January 19, 2025 (Sunday)
    ]],
    ['returns all Saturdays in a short date range', [DayOfWeek.Saturday, '2025-01-01', '2025-01-10'], [
      '2025-01-04', // January 4, 2025 (Saturday)
    ]],
    ['returns empty array when no matching days in range', [DayOfWeek.Thursday, '2025-01-01', '2025-01-01'], []],
    ['handles cross-month date range', [DayOfWeek.Tuesday, '2025-01-28', '2025-02-10'], [
      '2025-01-28', // January 28, 2025 (Tuesday)
      '2025-02-04', // February 4, 2025 (Tuesday)
    ]],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = getWeeklyDates(...args);
    expect(actual).toEqual(expected);
  });
});
