import type { Month } from './types.js';

export function newDateWithEndOfMonthLimit(year: number, month: Month, dayOfMonth: number): Date {
  const date = new Date(year, month, dayOfMonth);
  return date.getMonth() !== month % 12 ? new Date(year, month + 1, 0) : date;
}
