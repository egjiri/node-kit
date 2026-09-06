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
  date.setFullYear(year, month, day);
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
  date.setUTCFullYear(year, month, day);
  return date;
}

export function today(timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone): CalendarDate {
  return toCalendarDate(new Date(), timeZone);
}

export function toCalendarDate(
  date: Date,
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
): CalendarDate {
  const epochMilliseconds = date.getTime();
  if (!Number.isFinite(epochMilliseconds)) {
    throw new RangeError('Invalid time value');
  }

  const calendarDate = Temporal.Instant.fromEpochMilliseconds(epochMilliseconds)
    .toZonedDateTimeISO(timeZone)
    .toPlainDate()
    .toString();
  return createCalendarDateFromDateString(calendarDate);
}

export function isValidCalendarDate(calendarDate: string): calendarDate is CalendarDate {
  return getValidCalendarDateParts(calendarDate) !== null;
}

function getValidCalendarDateParts(calendarDate: string): CalendarDateParts | null {
  const strParts = getCalendarDateStringParts(calendarDate);
  if (!strParts) {
    return null;
  }

  const parts = {
    year: Number(strParts.year),
    month: Number(strParts.month) - 1,
    day: Number(strParts.day),
  };

  return isCalendarDateParts(parts) ? parts : null;
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

function isCalendarDateParts(parts: { year: number; month: number; day: number }): parts is CalendarDateParts {
  try {
    Temporal.PlainDate.from({ ...parts, month: parts.month + 1 }, { overflow: 'reject' });
    return true;
  } catch {
    return false;
  }
}
