import { getDayOfWeek } from './get-day-of-week';
import { DayOfWeek } from './types';
import type { Cases } from 'testing';

describe('getDayOfWeek', () => {
  const cases: Cases<typeof getDayOfWeek> = [
    ['returns Monday', ['2025-01-06'], DayOfWeek.Monday],
    ['returns Tuesday', ['2025-01-07'], DayOfWeek.Tuesday],
    ['returns Wednesday', ['2025-01-08'], DayOfWeek.Wednesday],
    ['returns Thursday', ['2025-01-09'], DayOfWeek.Thursday],
    ['returns Friday', ['2025-01-10'], DayOfWeek.Friday],
    ['returns Saturday', ['2025-01-11'], DayOfWeek.Saturday],
    ['returns Sunday', ['2025-01-12'], DayOfWeek.Sunday],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = getDayOfWeek(...args);
    expect(actual).toBe(expected);
  });

});
