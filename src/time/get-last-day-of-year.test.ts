import { createCalendarDate } from './calendar-date';
import { getLastDayOfYear } from './get-last-day-of-year';
import { Month } from './types';
import type { Cases } from 'testing';

describe('getLastDayOfYear', () => {
  const currentYear = new Date().getFullYear();

  const cases: Cases<typeof getLastDayOfYear> = [
    ['returns December 31 of current year when called with no parameter', [], createCalendarDate(currentYear, Month.December, 31)],
    ['returns December 31 of current year when called with "this-year"', ['this-year'], createCalendarDate(currentYear, Month.December, 31)],
    ['returns December 31 of next year when called with "next-year"', ['next-year'], createCalendarDate(currentYear + 1, Month.December, 31)],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = getLastDayOfYear(...args);
    expect(actual).toEqual(expected);
  });
});
