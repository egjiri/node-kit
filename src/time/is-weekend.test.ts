import { isWeekend } from './is-weekend';
import type { Cases } from 'testing';

describe('isWeekend', () => {
  const cases: Cases<typeof isWeekend> = [
    ['returns true for Saturday', ['2025-01-04'], true],
    ['returns true for Sunday', ['2025-01-05'], true],
    ['returns false for Monday', ['2025-01-06'], false],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = isWeekend(...args);
    expect(actual).toBe(expected);
  });
});
