import { isDayOfMonth, isMonth } from './types.js';
import type { CalendarDate, CalendarDateParts, DayOfMonth, Month } from './types.js';

const CALENDAR_DATE_PATTERN = /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/;
const MONTH_DAY_YEAR_DATE_PATTERN = /^(?<month>\d{2})\/(?<day>\d{2})\/(?<year>\d{4})$/;

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

export function normalizeToCalendarDate(value: string): CalendarDate {
  let calendarDate: string | undefined;

  if (CALENDAR_DATE_PATTERN.test(value)) {
    calendarDate = value;
  } else {
    const groups = MONTH_DAY_YEAR_DATE_PATTERN.exec(value)?.groups;
    if (groups) {
      calendarDate = `${groups.year}-${groups.month}-${groups.day}`;
    }
  }

  if (!calendarDate) {
    throw new Error(`Invalid calendar date string: ${value}. Expected MM/DD/YYYY or YYYY-MM-DD.`);
  }

  if (!isValidCalendarDate(calendarDate)) {
    throw new Error(`Invalid calendar date string: ${value}. Expected a valid calendar date.`);
  }

  return calendarDate;
}

export function addDaysToCalendarDate(calendarDate: CalendarDate, days: number): CalendarDate {
  const date = toUtcMidnight(calendarDate);
  date.setUTCDate(date.getUTCDate() + days);
  return toCalendarDate(date, 'UTC');
}

export function calendarDateToLocalDate(calendarDate: CalendarDate): Date {
  const { year, month, day } = parseCalendarDate(calendarDate);
  const date = new Date(year, month, day);
  date.setFullYear(year);
  return date;
}

export function parseCalendarDate(calendarDate: string): CalendarDateParts {
  const parts = getValidCalendarDateParts(calendarDate);
  if (!parts) {
    throw new Error(`Invalid calendar date: ${calendarDate}`);
  }

  return parts;
}

export function toUtcMidnight(calendarDate: CalendarDate): Date {
  const { year, month, day } = parseCalendarDate(calendarDate);
  const date = new Date(Date.UTC(year, month, day));
  date.setUTCFullYear(year);
  return date;
}

export function today(timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone): CalendarDate {
  return toCalendarDate(new Date(), timeZone);
}

export function toCalendarDate(date: Date, timeZone?: string): CalendarDate {
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
  return getValidCalendarDateParts(calendarDate) !== null;
}

function getValidCalendarDateParts(calendarDate: string): CalendarDateParts | null {
  const groups = CALENDAR_DATE_PATTERN.exec(calendarDate)?.groups;
  if (!groups) {
    return null;
  }

  const year = Number(groups.year);
  const month = Number(groups.month) - 1;
  const day = Number(groups.day);

  if (!isMonth(month) || !isDayOfMonth(day, month, year)) {
    return null;
  }

  return { year, month, day };
}

function getCalendarDatePart(parts: Intl.DateTimeFormatPart[], type: 'year' | 'month' | 'day'): string {
  const part = parts.find(part => part.type === type);
  if (!part) {
    throw new Error(`Unable to format calendar date: missing ${type}`);
  }

  return part.value;
}
