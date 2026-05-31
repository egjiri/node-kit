import { addDays } from './add-days.js';
import { parseCalendarDate } from './calendar-date.js';
import { getHolidayDates } from './get-holidays.js';
import { isBusinessDay } from './is-business-day.js';
import { RelativeTime } from './types.js';
import type { CalendarDate } from './types.js';

export function getNextBusinessDay(date: CalendarDate, paymentTiming = RelativeTime.Later): CalendarDate {
  const holidayDates = Object.values(getHolidayDates(parseCalendarDate(date).year));
  if (isBusinessDay(date, holidayDates)) {
    return date;
  }

  date = addDays(date, paymentTiming === RelativeTime.Later ? 1 : -1);
  return getNextBusinessDay(date, paymentTiming);
}
