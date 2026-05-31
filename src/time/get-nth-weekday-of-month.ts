import { addDays } from './add-days.js';
import { createCalendarDate, toUtcMidnight } from './calendar-date.js';
import type { CalendarDate, DayOfWeek, Month, Week } from './types.js';

export function getNthWeekdayOfMonth(week: Week, dayOfWeek: DayOfWeek, month: Month, year: number): CalendarDate {
  const firstDayOfMonth = createCalendarDate(year, month, 1);
  const daysUntilWeekday = (dayOfWeek - toUtcMidnight(firstDayOfMonth).getUTCDay() + 7) % 7;
  const firstWeekdayOfMonth = addDays(firstDayOfMonth, daysUntilWeekday);
  return addDays(firstWeekdayOfMonth, week * 7);
}
