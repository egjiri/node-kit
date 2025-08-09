import { addDays } from './add-days';
import { isLeapYear } from './is-leap-year';
import { Month } from './types';

export function addYears(date: Date, years: number): Date {
  const newDate = new Date(date);
  newDate.setFullYear(date.getFullYear() + years);

  // If the original date was February 29 and the new year is not a leap year, shift new day to February 28.
  const originalDateWasFebruary29 = date.getMonth() === Month.February && date.getUTCDate() === 29;
  const newYearIsNotALeapYear = !isLeapYear(newDate.getFullYear());
  if (originalDateWasFebruary29 && newYearIsNotALeapYear) {
    return addDays(newDate, -1);
  }

  return newDate;
}
