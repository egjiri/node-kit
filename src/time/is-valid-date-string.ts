import { createCalendarDateFromDateString } from './calendar-date.js';

export function isValidDateString(value: string): boolean {
  try {
    createCalendarDateFromDateString(value);
    return true;
  } catch {
    return false;
  }
}
