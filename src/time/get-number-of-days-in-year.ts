import { isLeapYear } from './is-leap-year';

export function getNumberOfDaysInYear(year = new Date().getFullYear()): number {
  return isLeapYear(year) ? 366 : 365;
}
