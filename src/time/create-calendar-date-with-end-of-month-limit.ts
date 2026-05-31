import { createCalendarDate } from './calendar-date.js';
import { getNumberOfDaysInMonth } from './get-number-of-days-in-month.js';
import { isDayOfMonth } from './types.js';
import type { CalendarDate, DayOfMonth, Month } from './types.js';

export function createCalendarDateWithEndOfMonthLimit(year: number, month: Month, dayOfMonth: DayOfMonth): CalendarDate {
  const day = Math.min(dayOfMonth, getNumberOfDaysInMonth(year, month));
  if (!isDayOfMonth(day, month, year)) {
    throw new Error(`Invalid day of month after clamping: ${day}`);
  }
  return createCalendarDate(year, month, day);
}
