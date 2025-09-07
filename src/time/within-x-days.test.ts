import { withinXDays } from './within-x-days';
import type { Cases } from 'testing';

describe('withinXDays', () => {
  const cases: Cases<typeof withinXDays> = [
    ['returns true when dates are exactly the same', [new Date(2025, 0, 15), new Date(2025, 0, 15)], true],
    ['returns false when dates are more than specified days apart', [new Date(2025, 0, 15), new Date(2025, 0, 18), 2], false],
    ['returns true when dates are within specified days', [new Date(2025, 0, 15), new Date(2025, 0, 17), 3], true],
    ['returns true when dates are exactly the specified days apart', [new Date(2025, 0, 15), new Date(2025, 0, 18), 3], true],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = withinXDays(...args);
    expect(actual).toBe(expected);
  });
});
