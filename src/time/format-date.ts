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

export const formatStandardDate = Intl.DateTimeFormat('en-US', {
  timeZone: 'UTC',
  month: '2-digit',
  day: '2-digit',
  year: 'numeric',
}).format;
