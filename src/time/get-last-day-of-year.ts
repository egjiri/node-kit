import { createCalendarDate } from './calendar-date.js';
import { Month } from './types.js';
import type { CalendarDate } from './types.js';

export function getLastDayOfYear(year: 'this-year' | 'next-year' = 'this-year'): CalendarDate {
  const currentYear = new Date().getFullYear();
  switch (year) {
    case 'this-year': return createCalendarDate(currentYear, Month.December, 31);
    case 'next-year': return createCalendarDate(currentYear + 1, Month.December, 31);
  }
}
