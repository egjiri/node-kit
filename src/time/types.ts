import { getNumberOfDaysInMonth } from './get-number-of-days-in-month.js';

export type CalendarDate = `${number}${number}${number}${number}-${number}${number}-${number}${number}`;

export enum Week {
  First = 0,
  Second,
  Third,
  Fourth,
  Fifth,
}

export enum DayOfWeek {
  Sunday = 0,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}
export function isDayOfWeek(day: unknown): day is DayOfWeek {
  return typeof day === 'number' && day >= 0 && day <= 6;
}

export enum Month {
  January = 0,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}
export function isMonth(month: number): month is Month {
  return month >= Month.January && month <= Month.December;
}

export type DayOfMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;
export function isDayOfMonth(day: unknown, month?: number, year?: number): day is DayOfMonth {
  if (typeof day !== 'number' || day <= 0) {
    return false;
  }

  const numberOfDaysInMonth = typeof month === 'number' && typeof year === 'number'
    ? getNumberOfDaysInMonth(year, month)
    : 31;

  return day <= numberOfDaysInMonth;
}

/* eslint-disable stylistic/no-multi-spaces */
export enum Frequency {
  Weekly = 'weekly',            // every week
  Biweekly = 'biweekly',        // every 2 weeks
  SemiMonthly = 'semi-monthly', // twice a month
  Monthly = 'monthly',          // every month
  Bimonthly = 'bimonthly',      // every 2 months
  Quarterly = 'quarterly',      // every 3 months
  Triannually = 'triannually',  // three times a yaer
  Yearly = 'yearly',            // every year
}
/* eslint-enable stylistic/no-multi-spaces */

export enum RelativeTime {
  Earlier = 'earlier',
  Later = 'later',
}
