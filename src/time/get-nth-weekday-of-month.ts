import { addDays } from './add-days.js';
import type { DayOfWeek, Month, Week } from './types.js';

export function getNthWeekdayOfMonth(week: Week, dayOfWeek: DayOfWeek, month: Month, year: number): Date {
  const firstDayOfMonth = new Date(year, month, 1);
  const daysUntilWeekday = (dayOfWeek - firstDayOfMonth.getDay() + 7) % 7;
  const firstWeekdayOfMonth = new Date(year, month, 1 + daysUntilWeekday);
  return addDays(firstWeekdayOfMonth, week * 7);
}
