import { isHoliday } from './is-holiday';
import { isWeekend } from './is-weekend';

export function isBusinessDay(date: Date, holidays: Date[] = []): boolean {
  return !isWeekend(date) && !isHoliday(date, holidays);
}
