import { isEqual } from './is-equal.js';

export function isHoliday(date: Date, holidays: Date[]): boolean {
  return holidays.some(holiday => isEqual(holiday, date));
}
