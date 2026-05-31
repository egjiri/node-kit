import { getDayOfWeek } from './get-day-of-week.js';
import { DayOfWeek } from './types.js';
import type { CalendarDate } from './types.js';

export function isWeekend(date: CalendarDate): boolean {
  const day = getDayOfWeek(date);
  return day === DayOfWeek.Saturday || day === DayOfWeek.Sunday;
}
