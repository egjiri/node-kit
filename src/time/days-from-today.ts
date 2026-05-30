import { isValidCalendarDate, today } from './calendar-date.js';
import { daysBetweenCalendarDates } from './days-between-calendar-dates.js';
import { isDayOffset } from './types.js';

export function daysFromToday(dayOffsetOrCalendarDate: string): number | null {
  if (isDayOffset(dayOffsetOrCalendarDate)) {
    return parseInt(dayOffsetOrCalendarDate, 10);
  }

  if (isValidCalendarDate(dayOffsetOrCalendarDate)) {
    return daysBetweenCalendarDates(today(), dayOffsetOrCalendarDate);
  }

  return null;
}
