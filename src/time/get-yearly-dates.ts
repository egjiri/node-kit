import { addYears } from './add-years.js';
import type { CalendarDate } from './types.js';

export function getYearlyDates(startDate: CalendarDate, endDate: CalendarDate): CalendarDate[] {
  const dates: CalendarDate[] = [];
  let date = startDate;
  let yearOffset = 0;
  while (date <= endDate) {
    dates.push(date);
    yearOffset += 1;
    date = addYears(startDate, yearOffset);
  }
  return dates;
}
