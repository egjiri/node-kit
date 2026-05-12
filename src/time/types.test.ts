import { isDayOffset, isDayOfMonth, isDayOfWeek, isMonth, Month } from './types';
import type { Cases } from 'testing';

describe('isDayOffset', () => {
  const cases: Cases<typeof isDayOffset> = [
    ['returns true for zero-day offset', ['0d'], true],
    ['returns true for positive unsigned offset', ['1d'], true],
    ['returns true for positive signed offset', ['+1d'], true],
    ['returns true for negative signed offset', ['-1d'], true],
    ['returns true for multi-day offset', ['123d'], true],
    ['returns false for empty string', [''], false],
    ['returns false for missing number', ['d'], false],
    ['returns false for missing day suffix', ['1'], false],
    ['returns false for uppercase suffix', ['1D'], false],
    ['returns false for decimal offset', ['1.5d'], false],
    ['returns false for spaced offset', ['1 d'], false],
    ['returns false for non-numeric offset', ['abc'], false],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = isDayOffset(...args);
    expect(actual).toBe(expected);
  });
});

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

describe('isMonth', () => {
  const cases: Cases<typeof isMonth> = [
    ['returns true for January', [Month.January], true],
    ['returns true for December', [Month.December], true],
    ['returns true for month in range', [Month.June], true],
    ['returns false for number before January', [-1], false],
    ['returns false for number after December', [12], false],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = isMonth(...args);
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
    ['returns true for first day of month', [1, Month.January, 2025], true],
    ['returns true for last day of a 31-day month', [31, Month.January, 2025], true],
    ['returns true for last day of a 30-day month', [30, Month.April, 2025], true],
    ['returns true for February 29 in a leap year', [29, Month.February, 2024], true],
    ['returns false for day before start of month', [0, Month.January, 2025], false],
    ['returns false for day after a 30-day month', [31, Month.April, 2025], false],
    ['returns false for February 29 in a non-leap year', [29, Month.February, 2025], false],
    ['returns false for February 30 in a leap year', [30, Month.February, 2024], false],
    ['uses generic DayOfMonth range when month is provided without year', [31, Month.April], true],
    ['uses generic DayOfMonth range when year is provided without month', [31, undefined, 2025], true],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = isDayOfMonth(...args);
    expect(actual).toBe(expected);
  });
});
