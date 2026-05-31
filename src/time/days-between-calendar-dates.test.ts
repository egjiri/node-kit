import { daysBetweenCalendarDates } from './days-between-calendar-dates';
import type { Cases } from 'testing';

describe('daysBetweenCalendarDates', () => {
  const cases: Cases<typeof daysBetweenCalendarDates> = [
    ['returns zero for the same date', ['2025-05-12', '2025-05-12'], 0],
    ['returns positive one for the next day', ['2025-05-12', '2025-05-13'], 1],
    ['returns negative one for the previous day', ['2025-05-12', '2025-05-11'], -1],
    ['counts days across a month boundary', ['2025-01-31', '2025-02-02'], 2],
    ['counts days across a year boundary', ['2024-12-31', '2025-01-02'], 2],
    ['includes February 29 in leap-year differences', ['2024-02-28', '2024-03-01'], 2],
    ['counts days from February 29 in a leap year', ['2024-02-29', '2024-03-01'], 1],
    ['handles dates in years Date.UTC treats specially', ['0099-12-31', '0100-01-01'], 1],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = daysBetweenCalendarDates(...args);
    expect(actual).toBe(expected);
  });
});
