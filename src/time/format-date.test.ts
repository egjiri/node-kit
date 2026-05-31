import { formatCalendarDate, formatDate } from '.';
import type { Cases } from 'testing';

describe('formatCalendarDate', () => {
  const cases: Cases<typeof formatCalendarDate> = [
    ['formats calendar date correctly', ['2025-01-15'], 'Wed, Jan 15, 2025'],
    ['preserves years below 100', ['0099-12-31'], 'Thu, Dec 31, 99'],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = formatCalendarDate(...args);
    expect(actual).toBe(expected);
  });
});

describe('formatDate', () => {
  it('formats date correctly', () => {
    const actual = formatDate(new Date(2025, 0, 15));
    const expected = 'Wed, Jan 15, 2025';
    expect(actual).toBe(expected);
  });
});
