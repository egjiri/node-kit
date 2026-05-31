import { toUtcMidnight } from './calendar-date.js';
import { isDayOfWeek } from './types.js';
import type { CalendarDate, DayOfWeek } from './types.js';

export function getDayOfWeek(date: CalendarDate): DayOfWeek {
  const day = toUtcMidnight(date).getUTCDay();
  if (!isDayOfWeek(day)) {
    throw new Error(`Invalid day of week for calendar date: ${date}`);
  }
  return day;
}
