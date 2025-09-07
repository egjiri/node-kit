import { isHoliday } from './is-holiday';
import type { Cases } from 'testing';

describe('isHoliday', () => {
  const testDate = new Date(2025, 0, 15, 10, 30, 45);

  const cases: Cases<typeof isHoliday> = [
    ['returns true when date is in holidays array', [testDate, [testDate]], true],
    ['returns false when date is not in holidays array', [testDate, [new Date(2025, 0, 16)]], false],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = isHoliday(...args);
    expect(actual).toBe(expected);
  });
});
