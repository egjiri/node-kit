import { isDayOfMonth, isMonth } from './types.js';
import type { CalendarDate, DayOfMonth, Month } from './types.js';

const CALENDAR_DATE_PATTERN = /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/;

export function createCalendarDate(year: number, month: Month, day: DayOfMonth): CalendarDate {
  const yearText = year.toString().padStart(4, '0');
  const monthText = (month + 1).toString().padStart(2, '0');
  const dayText = day.toString().padStart(2, '0');
  const calendarDate = `${yearText}-${monthText}-${dayText}`;

  if (!isValidCalendarDate(calendarDate)) {
    throw new Error(`Invalid calendar date: year=${year}, month=${month}, day=${day}`);
  }

  return calendarDate;
}

export function toCalendarDate(date: Date, timeZone = 'UTC'): CalendarDate {
  const parts = new Intl.DateTimeFormat(undefined, {
    calendar: 'gregory',
    numberingSystem: 'latn',
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);

  const year = getCalendarDatePart(parts, 'year').padStart(4, '0');
  const month = getCalendarDatePart(parts, 'month');
  const day = getCalendarDatePart(parts, 'day');
  const calendarDate = `${year}-${month}-${day}`;

  if (!isValidCalendarDate(calendarDate)) {
    throw new Error(`Invalid calendar date: ${calendarDate}`);
  }

  return calendarDate;
}

export function isValidCalendarDate(calendarDate: string): calendarDate is CalendarDate {
  const groups = CALENDAR_DATE_PATTERN.exec(calendarDate)?.groups;
  if (!groups) {
    return false;
  }

  const year = Number(groups.year);
  const month = Number(groups.month) - 1;
  const day = Number(groups.day);

  return isMonth(month) && isDayOfMonth(day, month, year);
}

function getCalendarDatePart(parts: Intl.DateTimeFormatPart[], type: 'year' | 'month' | 'day'): string {
  const part = parts.find(part => part.type === type);
  if (!part) {
    throw new Error(`Unable to format calendar date: missing ${type}`);
  }

  return part.value;
}
