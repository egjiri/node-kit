import { parseCalendarDate } from './calendar-date.js';
import { createCalendarDateWithEndOfMonthLimit } from './create-calendar-date-with-end-of-month-limit.js';
import { isMonth, Month } from './types.js';
import type { CalendarDate, DayOfMonth } from './types.js';

export function getMonthlyDates(dayOfMonth: DayOfMonth, startDate: CalendarDate, endDate: CalendarDate): CalendarDate[] {
  const dates: CalendarDate[] = [];
  let { year, month } = parseCalendarDate(startDate);
  let date = createCalendarDateWithEndOfMonthLimit(year, month, dayOfMonth);
  while (date <= endDate) {
    if (date >= startDate) {
      dates.push(date);
    }

    month = month + 1;
    if (!isMonth(month)) {
      year += 1;
      month = Month.January;
    }

    date = createCalendarDateWithEndOfMonthLimit(year, month, dayOfMonth);
  }
  return dates;
}
