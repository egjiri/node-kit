import { DayOfWeek } from './types.js';

export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === DayOfWeek.Saturday || day === DayOfWeek.Sunday;
}
