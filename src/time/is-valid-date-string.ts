import { normalizeToCalendarDate } from './calendar-date.js';

export function isValidDateString(value: string): boolean {
  try {
    normalizeToCalendarDate(value);
    return true;
  } catch {
    return false;
  }
}
