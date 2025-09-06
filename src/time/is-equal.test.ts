import { isEqual } from './is-equal';
import type { Cases } from 'testing';

describe('isEqual', () => {
  const cases: Cases<typeof isEqual> = [
    ['returns true for identical dates', [new Date(2025, 0, 15, 10, 30, 45), new Date(2025, 0, 15, 10, 30, 45)], true],
    ['returns false for different dates', [new Date(2025, 0, 15, 10, 30, 45), new Date(2025, 0, 15, 10, 30, 46)], false],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = isEqual(...args);
    expect(actual).toBe(expected);
  });
});
