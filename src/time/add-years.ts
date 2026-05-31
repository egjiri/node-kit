import { addDays } from './add-days.js';
import { createCalendarDate, parseCalendarDate } from './calendar-date.js';
import { isLeapYear } from './is-leap-year.js';
import { Month } from './types.js';
import type { CalendarDate } from './types.js';

export function addYears(date: Date, years: number): Date;
export function addYears(date: CalendarDate, years: number): CalendarDate;
export function addYears(date: Date | CalendarDate, years: number): Date | CalendarDate {
  return date instanceof Date ? addYearsToDate(date, years) : addYearsToCalendarDate(date, years);
}

function addYearsToDate(date: Date, years: number): Date {
  const newDate = new Date(date);
  newDate.setFullYear(date.getFullYear() + years);
  const shiftDay = date.getMonth() === Month.February && date.getDate() === 29 && !isLeapYear(newDate.getFullYear());
  return shiftDay ? addDays(newDate, -1) : newDate;
}

function addYearsToCalendarDate(calendarDate: CalendarDate, years: number): CalendarDate {
  const { year, month, day } = parseCalendarDate(calendarDate);
  const newYear = year + years;
  const newDay = month === Month.February && day === 29 && !isLeapYear(newYear) ? 28 : day;
  return createCalendarDate(newYear, month, newDay);
}
