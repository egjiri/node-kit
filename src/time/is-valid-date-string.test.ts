import { isValidDateString } from './is-valid-date-string';
import type { Cases } from 'testing';

describe('isValidDateString', () => {
  const cases: Cases<typeof isValidDateString> = [
    ['returns true for valid MM/DD/YYYY format', ['01/15/2025'], true],
    ['returns true for valid YYYY-MM-DD format', ['2025-01-15'], true],
    ['returns false for invalid format', ['2025-1-15'], false],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = isValidDateString(...args);
    expect(actual).toBe(expected);
  });
});
