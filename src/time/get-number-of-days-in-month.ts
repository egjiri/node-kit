import type { Month } from './types';

export function getNumberOfDaysInMonth(year: number, month: Month): number {
  return new Date(year, month + 1, 0).getDate();
}
