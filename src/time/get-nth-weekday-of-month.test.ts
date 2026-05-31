import { getNthWeekdayOfMonth } from './get-nth-weekday-of-month';
import { DayOfWeek, Month, Week } from './types';
import type { Cases } from 'testing';

describe('getNthWeekdayOfMonth', () => {
  const cases: Cases<typeof getNthWeekdayOfMonth> = [
    ['returns fourth Wednesday of July 2025', [Week.Fourth, DayOfWeek.Wednesday, Month.July, 2025], '2025-07-23'],
    ['returns first Monday of August 2025', [Week.First, DayOfWeek.Monday, Month.August, 2025], '2025-08-04'],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = getNthWeekdayOfMonth(...args);
    expect(actual).toBe(expected);
  });
});
