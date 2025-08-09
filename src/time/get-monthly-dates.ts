import { newDateWithEndOfMonthLimit } from './new-date-with-end-of-month-limit';
import type { DayOfMonth } from './types';

export function getMonthlyDates(dayOfMonth: DayOfMonth, startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];
  const year = startDate.getFullYear();
  let month = startDate.getMonth();
  let date = newDateWithEndOfMonthLimit(year, month, dayOfMonth);
  while (date <= endDate) {
    dates.push(date);
    month += 1;
    date = newDateWithEndOfMonthLimit(year, month, dayOfMonth);
  }
  return dates.filter(date => date >= startDate && date <= endDate);
}
