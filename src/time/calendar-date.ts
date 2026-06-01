import { isDayOfMonth, isMonth } from './types.js';
import type { CalendarDate, CalendarDateParts, DayOfMonth, Month } from './types.js';

function createCalendarDateFromTextParts(year: string, month: string, day: string): CalendarDate {
  const calendarDate = `${year}-${month}-${day}`;
  if (!isValidCalendarDate(calendarDate)) {
    throw new Error(`Invalid calendar date: year=${Number(year)}, month=${Number(month) - 1}, day=${Number(day)}`);
  }
  return calendarDate;
}

export function createCalendarDate(year: number, month: Month, day: DayOfMonth): CalendarDate {
  const yearText = year.toString().padStart(4, '0');
  const monthText = (month + 1).toString().padStart(2, '0');
  const dayText = day.toString().padStart(2, '0');
  return createCalendarDateFromTextParts(yearText, monthText, dayText);
}

export function createCalendarDateFromDateString(value: string): CalendarDate {
  const parts = getCalendarDateStringParts(value) ?? getMonthDayYearDateStringParts(value);
  if (!parts) {
    throw new Error(`Invalid calendar date string: ${value}. Expected MM/DD/YYYY or YYYY-MM-DD.`);
  }
  return createCalendarDateFromTextParts(parts.year, parts.month, parts.day);
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
  return createCalendarDateFromTextParts(year, month, day);
}

export function isValidCalendarDate(calendarDate: string): calendarDate is CalendarDate {
  return getValidCalendarDateParts(calendarDate) !== null;
}

function getValidCalendarDateParts(calendarDate: string): CalendarDateParts | null {
  const parts = getCalendarDateStringParts(calendarDate);
  if (!parts) {
    return null;
  }

  const year = Number(parts.year);
  const month = Number(parts.month) - 1;
  const day = Number(parts.day);

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

function getCalendarDateStringParts(value: string): ReturnType<typeof getDateStringPartsFromPattern> {
  return getDateStringPartsFromPattern(value, /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/);
}

function getMonthDayYearDateStringParts(value: string): ReturnType<typeof getDateStringPartsFromPattern> {
  return getDateStringPartsFromPattern(value, /^(?<month>\d{2})\/(?<day>\d{2})\/(?<year>\d{4})$/);
}

function getDateStringPartsFromPattern(value: string, pattern: RegExp): Record<'year' | 'month' | 'day', string> | null {
  const { year, month, day } = pattern.exec(value)?.groups ?? {};
  if (!year || !month || !day) {
    return null;
  }
  return { year, month, day };
}
