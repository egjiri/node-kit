import { getNumberOfDaysInMonth } from './get-number-of-days-in-month';
import { Month } from './types';
import type { Cases } from 'testing';

describe('getNumberOfDaysInMonth', () => {
  const cases: Cases<typeof getNumberOfDaysInMonth> = [
    ['returns 31 for January', [2025, Month.January], 31],
    ['returns 30 for April', [2025, Month.April], 30],
    ['returns 28 for February in a regular year', [2025, Month.February], 28],
    ['returns 29 for February in a leap year', [2024, Month.February], 29],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = getNumberOfDaysInMonth(...args);
    expect(actual).toBe(expected);
  });
});
