import { addDays } from './add-days';
import type { DayOfWeek } from './types';

export function getWeeklyDates(dayOfWeek: DayOfWeek, startDate: Date, endDate: Date): Date[] {
  const daysApart = (dayOfWeek - startDate.getDay() + 7) % 7;
  let date = addDays(startDate, daysApart);

  const dates: Date[] = [];
  while (date <= endDate) {
    dates.push(date);
    date = addDays(date, 7);
    date.setHours(0, 0, 0, 0);
  }
  return dates;
}
