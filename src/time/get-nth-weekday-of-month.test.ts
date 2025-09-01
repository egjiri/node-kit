import { getNthWeekdayOfMonth } from './get-nth-weekday-of-month';
import { DayOfWeek, Month, Week } from './types';
// import type { Cases } from 'testing';

describe('getNthWeekdayOfMonth', () => {
  it('returns fourth Wednesday of July 2025', () => {
    const expected = getNthWeekdayOfMonth(Week.Fourth, DayOfWeek.Wednesday, Month.July, 2025);
    const actual = new Date(2025, 6, 23);
    expect(actual).toEqual(expected);
  });
});
