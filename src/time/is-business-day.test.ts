import { isBusinessDay } from './is-business-day';
import type { Cases } from 'testing';

describe('isBusinessDay', () => {
  const cases: Cases<typeof isBusinessDay> = [
    ['returns false for weekend (Sunday)', [new Date(2025, 0, 5)], false],
    ['returns true for weekday (Monday) with no holiday', [new Date(2025, 0, 6)], true],
    ['returns false for weekday (Monday) that is a holiday', [new Date(2025, 0, 6), [new Date(2025, 0, 6)]], false],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = isBusinessDay(...args);
    expect(actual).toBe(expected);
  });
});
