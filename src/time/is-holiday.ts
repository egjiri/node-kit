import { isEqual } from './is-equal';

export function isHoliday(date: Date, holidays: Date[]): boolean {
  return holidays.some(holiday => isEqual(holiday, date));
}
