import { isWeekend } from './is-weekend.js';
import type { CalendarDate } from './types.js';

export function isBusinessDay(date: CalendarDate, holidays: CalendarDate[] = []): boolean {
  return !isWeekend(date) && !holidays.includes(date);
}
