import { isLeapYear } from './is-leap-year';
import type { Cases } from 'testing';

describe('isLeapYear', () => {
  const cases: Cases<typeof isLeapYear> = [
    ['returns true for leap year', [2024], true],
    ['returns false for non-leap year', [2025], false],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = isLeapYear(...args);
    expect(actual).toBe(expected);
  });
});
