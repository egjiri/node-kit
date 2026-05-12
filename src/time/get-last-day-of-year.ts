import { Month } from './types.js';

export function getLastDayOfYear(year: 'this-year' | 'next-year' = 'this-year'): Date {
  const currentYear = new Date().getFullYear();
  switch (year) {
    case 'this-year': return new Date(currentYear, Month.December, 31);
    case 'next-year': return new Date(currentYear + 1, Month.December, 31);
  }
}
