import type { CalendarDate } from './types.js';

export function daysBetweenCalendarDates(from: CalendarDate, to: CalendarDate): number {
  return Temporal.PlainDate.from(from).until(to).days;
}
