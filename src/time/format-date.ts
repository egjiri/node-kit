import { toUtcMidnight } from './calendar-date.js';
import type { CalendarDate } from './types.js';

export function formatCalendarDate(calendarDate: CalendarDate): string {
  return formatDate(toUtcMidnight(calendarDate), 'UTC');
}

export function formatDate(date: Date, timeZone?: string): string {
  return date.toLocaleDateString('en-us', {
    timeZone,
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
