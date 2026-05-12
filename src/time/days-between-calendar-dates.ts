import type { CalendarDate } from './types.js';

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

export function daysBetweenCalendarDates(from: CalendarDate, to: CalendarDate): number {
  const fromDate = toUtcMidnight(from).getTime();
  const toDate = toUtcMidnight(to).getTime();

  return (toDate - fromDate) / MILLISECONDS_PER_DAY;
}

function toUtcMidnight(calendarDate: CalendarDate): Date {
  const [year, month, day] = calendarDate.split('-').map(Number);

  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCFullYear(year);

  return date;
}
