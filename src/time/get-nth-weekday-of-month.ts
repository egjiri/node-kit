import { addDays } from './add-days.js';
import { createCalendarDate } from './calendar-date.js';
import { getDayOfWeek } from './get-day-of-week.js';
import type { CalendarDate, DayOfWeek, Month, Week } from './types.js';

export function getNthWeekdayOfMonth(week: Week, dayOfWeek: DayOfWeek, month: Month, year: number): CalendarDate {
  const firstDayOfMonth = createCalendarDate(year, month, 1);
  const daysUntilWeekday = (dayOfWeek - getDayOfWeek(firstDayOfMonth) + 7) % 7;
  const firstWeekdayOfMonth = addDays(firstDayOfMonth, daysUntilWeekday);
  return addDays(firstWeekdayOfMonth, week * 7);
}
