import { isWeekend } from './is-weekend';
import type { Cases } from 'testing';

describe('isWeekend', () => {
  const cases: Cases<typeof isWeekend> = [
    ['returns true for Sunday', [new Date(2025, 0, 5)], true],
    ['returns false for Monday', [new Date(2025, 0, 6)], false],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = isWeekend(...args);
    expect(actual).toBe(expected);
  });
});
