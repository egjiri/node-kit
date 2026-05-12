import { addDays } from './add-days.js';
import { getHolidayDates } from './get-holidays.js';
import { isBusinessDay } from './is-business-day.js';
import { RelativeTime } from './types.js';

export function getNextBusinessDay(date: Date, paymentTiming = RelativeTime.Later): Date {
  const holidayDates = Object.values(getHolidayDates(date.getFullYear()));
  if (isBusinessDay(date, holidayDates)) {
    return date;
  }

  date = addDays(date, paymentTiming === RelativeTime.Later ? 1 : -1);
  return getNextBusinessDay(date, paymentTiming);
}
