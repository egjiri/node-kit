import { addDays } from './add-days';
import { getHolidayDates } from './get-holidays';
import { isBusinessDay } from './is-business-day';
import { RelativeTime } from './types';

export function getNextBusinessDay(date: Date, paymentTiming = RelativeTime.Later): Date {
  const holidayDates = Object.values(getHolidayDates(date.getFullYear()));
  if (isBusinessDay(date, holidayDates)) {
    return date;
  }

  date = addDays(date, paymentTiming === RelativeTime.Later ? 1 : -1);
  return getNextBusinessDay(date, paymentTiming);
}
