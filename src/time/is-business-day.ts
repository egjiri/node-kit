import { isHoliday } from './is-holiday.js';
import { isWeekend } from './is-weekend.js';

export function isBusinessDay(date: Date, holidays: Date[] = []): boolean {
  return !isWeekend(date) && !isHoliday(date, holidays);
}
