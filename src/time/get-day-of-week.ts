import type { CalendarDate, DayOfWeek } from './types.js';

export function getDayOfWeek(date: CalendarDate): DayOfWeek {
  return Temporal.PlainDate.from(date).dayOfWeek % 7;
}
