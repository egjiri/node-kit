import { toUtcMidnight } from './calendar-date.js';
import type { CalendarDate } from './types.js';

export function format(date: Date, timeZone?: string): string;
export function format(date: CalendarDate): string;
export function format(date: Date | CalendarDate, timeZone?: string): string {
  return date instanceof Date ? formatDate(date, timeZone) : formatCalendarDate(date);
}

function formatDate(date: Date, timeZone?: string): string {
  return date.toLocaleDateString('en-us', {
    timeZone,
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatCalendarDate(calendarDate: CalendarDate): string {
  return formatDate(toUtcMidnight(calendarDate), 'UTC');
}
