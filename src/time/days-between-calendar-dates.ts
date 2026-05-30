import { toUtcMidnight } from './calendar-date.js';
import type { CalendarDate } from './types.js';

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

export function daysBetweenCalendarDates(from: CalendarDate, to: CalendarDate): number {
  const fromDate = toUtcMidnight(from).getTime();
  const toDate = toUtcMidnight(to).getTime();

  return (toDate - fromDate) / MILLISECONDS_PER_DAY;
}
