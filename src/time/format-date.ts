import type { CalendarDate } from './types.js';

export function formatCalendarDate(calendarDate: CalendarDate): string {
  const [year, month, day] = calendarDate.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCFullYear(year);
  return formatDate(date, 'UTC');
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
