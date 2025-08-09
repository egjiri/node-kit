import { DayOfWeek } from './types';

export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === DayOfWeek.Saturday || day === DayOfWeek.Sunday;
}
