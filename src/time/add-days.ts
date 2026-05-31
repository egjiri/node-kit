import { toCalendarDate, toUtcMidnight } from './calendar-date.js';
import type { CalendarDate } from './types.js';

export function addDays(date: Date, days: number): Date;
export function addDays(date: CalendarDate, days: number): CalendarDate;
export function addDays(date: Date | CalendarDate, days: number): Date | CalendarDate {
  return date instanceof Date ? addDaysToDate(date, days) : addDaysToCalendarDate(date, days);
}

function addDaysToDate(date: Date, days: number): Date {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
}

function addDaysToCalendarDate(calendarDate: CalendarDate, days: number): CalendarDate {
  const date = toUtcMidnight(calendarDate);
  date.setUTCDate(date.getUTCDate() + days);
  return toCalendarDate(date, 'UTC');
}
