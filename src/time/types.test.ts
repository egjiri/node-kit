import { isDayOfWeek, isDayOfMonth } from './types';
import type { Cases } from 'testing';

describe('isDayOfWeek', () => {
  const cases: Cases<typeof isDayOfWeek> = [
    ['returns true for valid DayOfWeek (0)', [0], true], // Sunday
    ['returns true for valid DayOfWeek (6)', [6], true], // Saturday
    ['returns false for number outside range', [7], false],
    ['returns false for negative number', [-1], false],
    ['returns false for string', ['Monday'], false],
    ['returns false for null', [null], false],
    ['returns false for undefined', [undefined], false],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = isDayOfWeek(...args);
    expect(actual).toBe(expected);
  });
});

describe('isDayOfMonth', () => {
  const cases: Cases<typeof isDayOfMonth> = [
    ['returns true for valid DayOfMonth (1)', [1], true],
    ['returns true for valid DayOfMonth (31)', [31], true],
    ['returns true for valid DayOfMonth (15)', [15], true],
    ['returns false for number outside range (0)', [0], false],
    ['returns false for number outside range (32)', [32], false],
    ['returns false for string', ['15'], false],
    ['returns false for null', [null], false],
    ['returns false for undefined', [undefined], false],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = isDayOfMonth(...args);
    expect(actual).toBe(expected);
  });
});
