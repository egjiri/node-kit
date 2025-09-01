import { getWeeklyDates } from './get-weekly-dates';
import { DayOfWeek } from './types';
import type { Cases } from 'testing';

describe('getWeeklyDates', () => {
  const cases: Cases<typeof getWeeklyDates> = [
    ['returns all Mondays in January 2025', [DayOfWeek.Monday, new Date(2025, 0, 1), new Date(2025, 0, 31)], [
      new Date(2025, 0, 6), // January 6, 2025 (Monday)
      new Date(2025, 0, 13), // January 13, 2025 (Monday)
      new Date(2025, 0, 20), // January 20, 2025 (Monday)
      new Date(2025, 0, 27), // January 27, 2025 (Monday)
    ]],
    ['returns all Fridays in February 2025', [DayOfWeek.Friday, new Date(2025, 1, 1), new Date(2025, 1, 28)], [
      new Date(2025, 1, 7), // February 7, 2025 (Friday)
      new Date(2025, 1, 14), // February 14, 2025 (Friday)
      new Date(2025, 1, 21), // February 21, 2025 (Friday)
      new Date(2025, 1, 28), // February 28, 2025 (Friday)
    ]],
    ['returns all Sundays when start date is already a Sunday', [DayOfWeek.Sunday, new Date(2025, 0, 5), new Date(2025, 0, 19)], [
      new Date(2025, 0, 5), // January 5, 2025 (Sunday)
      new Date(2025, 0, 12), // January 12, 2025 (Sunday)
      new Date(2025, 0, 19), // January 19, 2025 (Sunday)
    ]],
    ['returns all Saturdays in a short date range', [DayOfWeek.Saturday, new Date(2025, 0, 1), new Date(2025, 0, 10)], [
      new Date(2025, 0, 4), // January 4, 2025 (Saturday)
    ]],
    ['returns empty array when no matching days in range', [DayOfWeek.Thursday, new Date(2025, 0, 1), new Date(2025, 0, 1)], []],
    ['handles cross-month date range', [DayOfWeek.Tuesday, new Date(2025, 0, 28), new Date(2025, 1, 10)], [
      new Date(2025, 0, 28), // January 28, 2025 (Tuesday)
      new Date(2025, 1, 4), // February 4, 2025 (Tuesday)
    ]],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = getWeeklyDates(...args);
    expect(actual).toEqual(expected);
  });

  test('ensures all returned dates have normalized time (00:00:00.000)', () => {
    const dates = getWeeklyDates(
      DayOfWeek.Monday,
      new Date(2025, 0, 1),
      new Date(2025, 0, 31),
    );

    dates.forEach(date => {
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });
  });
});
