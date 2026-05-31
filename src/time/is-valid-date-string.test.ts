import { isValidDateString } from './is-valid-date-string';
import type { Cases } from 'testing';

describe('isValidDateString', () => {
  const cases: Cases<typeof isValidDateString> = [
    ['returns true for valid MM/DD/YYYY date string', ['01/15/2025'], true],
    ['returns true for valid YYYY-MM-DD date string', ['2025-01-15'], true],
    ['returns false for invalid MM/DD/YYYY date string', ['02/29/2025'], false],
    ['returns false for invalid YYYY-MM-DD date string', ['2025-02-29'], false],
    ['returns false for invalid format', ['2025-1-15'], false],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = isValidDateString(...args);
    expect(actual).toBe(expected);
  });
});
