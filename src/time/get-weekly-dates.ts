import { addDays } from './add-days.js';
import { getDayOfWeek } from './get-day-of-week.js';
import type { CalendarDate, DayOfWeek } from './types.js';

export function getWeeklyDates(dayOfWeek: DayOfWeek, startDate: CalendarDate, endDate: CalendarDate): CalendarDate[] {
  const daysApart = (dayOfWeek - getDayOfWeek(startDate) + 7) % 7;
  let date = addDays(startDate, daysApart);

  const dates: CalendarDate[] = [];
  while (date <= endDate) {
    dates.push(date);
    date = addDays(date, 7);
  }
  return dates;
}
