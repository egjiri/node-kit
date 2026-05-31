import { isBusinessDay } from './is-business-day';
import type { Cases } from 'testing';

describe('isBusinessDay', () => {
  const cases: Cases<typeof isBusinessDay> = [
    ['returns false for weekend (Sunday)', ['2025-01-05'], false],
    ['returns true for weekday (Monday) with no holiday', ['2025-01-06'], true],
    ['returns false for weekday (Monday) that is a holiday', ['2025-01-06', ['2025-01-06']], false],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = isBusinessDay(...args);
    expect(actual).toBe(expected);
  });
});
