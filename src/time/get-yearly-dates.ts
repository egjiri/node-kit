import { addYears } from './add-years.js';
import type { CalendarDate } from './types.js';

export function getYearlyDates(startDate: CalendarDate, endDate: CalendarDate): CalendarDate[] {
  const dates: CalendarDate[] = [];
  while (startDate <= endDate) {
    dates.push(startDate);
    startDate = addYears(startDate, 1);
  }
  return dates;
}
