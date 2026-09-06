import {
  calendarDateToLocalDate,
  createCalendarDate,
  createCalendarDateFromDateString,
  isValidCalendarDate,
  parseCalendarDate,
  toCalendarDate,
  today,
  toUtcMidnight,
} from './calendar-date';
import { Month } from './types';
import type { Cases } from 'testing';

describe('createCalendarDate', () => {
  const cases: Cases<typeof createCalendarDate> = [
    ['returns a calendar date from date parts', [2030, Month.May, 31], '2030-05-31'],
    ['zero-pads years, months, and days', [99, Month.January, 1], '0099-01-01'],
    ['accepts February 29 in a leap year', [2024, Month.February, 29], '2024-02-29'],
    ['accepts February 29 in year zero', [0, Month.February, 29], '0000-02-29'],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = createCalendarDate(...args);
    expect(actual).toBe(expected);
  });

  const invalidCases: [string, Parameters<typeof createCalendarDate>][] = [
    ['throws for February 29 in a non-leap year', [2025, Month.February, 29]],
    ['throws for day after a 30-day month', [2025, Month.April, 31]],
  ];

  test.each(invalidCases)('%s', (_, args) => {
    const actual = () => createCalendarDate(...args);
    expect(actual).toThrow(`Invalid calendar date: year=${args[0]}, month=${args[1]}, day=${args[2]}`);
  });
});

describe('createCalendarDateFromDateString', () => {
  const cases: Cases<typeof createCalendarDateFromDateString> = [
    ['returns a YYYY-MM-DD calendar date unchanged', ['2025-01-15'], '2025-01-15'],
    ['converts an MM/DD/YYYY date to a calendar date', ['01/15/2025'], '2025-01-15'],
    ['preserves years below 100', ['12/31/0099'], '0099-12-31'],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = createCalendarDateFromDateString(...args);
    expect(actual).toBe(expected);
  });

  const invalidCases = [
    ['throws for unsupported date formats', '2025-1-15', 'Invalid calendar date string: 2025-1-15. Expected MM/DD/YYYY or YYYY-MM-DD.'],
    ['throws for broader Temporal date formats', '2025-01-15[u-ca=iso8601]', 'Invalid calendar date string: 2025-01-15[u-ca=iso8601]. Expected MM/DD/YYYY or YYYY-MM-DD.'],
    ['throws for invalid calendar dates', '2025-02-29', 'Invalid calendar date: year=2025, month=1, day=29'],
    ['throws for invalid MM/DD/YYYY calendar dates', '02/29/2025', 'Invalid calendar date: year=2025, month=1, day=29'],
  ];

  test.each(invalidCases)('%s', (_, value, expected) => {
    const actual = () => createCalendarDateFromDateString(value);
    expect(actual).toThrow(expected);
  });
});

describe('calendarDateToLocalDate', () => {
  const cases: Cases<typeof calendarDateToLocalDate> = [
    ['returns a date at local midnight', ['2030-05-31'], new Date('2030-05-31T00:00:00.000')],
    ['preserves years below 100', ['0099-05-31'], new Date('0099-05-31T00:00:00.000')],
    ['preserves February 29 in year zero', ['0000-02-29'], new Date('0000-02-29T00:00:00.000')],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = calendarDateToLocalDate(...args);
    expect(actual).toEqual(expected);
  });
});

describe('parseCalendarDate', () => {
  const cases: Cases<typeof parseCalendarDate> = [
    ['returns calendar date parts', ['2030-05-31'], { year: 2030, month: Month.May, day: 31 }],
    ['returns zero-based month values', ['2030-01-01'], { year: 2030, month: Month.January, day: 1 }],
    ['preserves years below 100', ['0099-12-31'], { year: 99, month: Month.December, day: 31 }],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = parseCalendarDate(...args);
    expect(actual).toEqual(expected);
  });

  const invalidCases = [
    ['throws for malformed calendar date', '2030-5-31'],
    ['throws for February 29 in a non-leap year', '2025-02-29'],
  ];

  test.each(invalidCases)('%s', (_, calendarDate) => {
    const actual = () => parseCalendarDate(calendarDate);
    expect(actual).toThrow(`Invalid calendar date: ${calendarDate}`);
  });
});

describe('toUtcMidnight', () => {
  const cases: Cases<typeof toUtcMidnight> = [
    ['returns a date at UTC midnight', ['2030-05-31'], new Date('2030-05-31T00:00:00.000Z')],
    ['preserves years below 100', ['0099-12-31'], new Date('0099-12-31T00:00:00.000Z')],
    ['preserves February 29 in year zero', ['0000-02-29'], new Date('0000-02-29T00:00:00.000Z')],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = toUtcMidnight(...args);
    expect(actual).toEqual(expected);
  });
});

describe('toCalendarDate', () => {
  const cases: Cases<typeof toCalendarDate> = [
    ['formats dates using local date components by default', [new Date(2025, Month.July, 15, 23, 59, 59, 999)], '2025-07-15'],
    ['formats the instant before midnight in the provided time zone', [new Date('2025-01-01T04:59:59.999Z'), 'America/Toronto'], '2024-12-31'],
    ['formats midnight in the provided time zone', [new Date('2025-01-01T05:00:00.000Z'), 'America/Toronto'], '2025-01-01'],
    ['formats dates using UTC when UTC is provided', [new Date('2025-01-01T04:59:59.000Z'), 'UTC'], '2025-01-01'],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = toCalendarDate(...args);
    expect(actual).toBe(expected);
  });

  test('throws for invalid dates without a time zone', () => {
    const actual = () => toCalendarDate(new Date(Number.NaN));
    expect(actual).toThrow('Invalid time value');
  });

  test('throws for invalid time zones', () => {
    const actual = () => toCalendarDate(new Date('2025-01-01T00:00:00.000Z'), 'Not/A_Time_Zone');
    expect(actual).toThrow(RangeError);
  });
});

describe('today', () => {
  const resolvedDateTimeFormatOptions = Intl.DateTimeFormat().resolvedOptions();

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2025-01-01T04:59:59.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  test('returns today in the runtime time zone by default', () => {
    vi.spyOn(Intl.DateTimeFormat.prototype, 'resolvedOptions').mockReturnValue({
      ...resolvedDateTimeFormatOptions,
      timeZone: 'America/Toronto',
    });

    const actual = today();

    expect(actual).toBe('2024-12-31');
  });

  test('returns today in the provided time zone', () => {
    const actual = today('UTC');

    expect(actual).toBe('2025-01-01');
  });
});

describe('isValidCalendarDate', () => {
  const cases: Cases<typeof isValidCalendarDate> = [
    ['returns true for a valid calendar date', ['2025-01-01'], true],
    ['returns true for February 29 in a leap year', ['2024-02-29'], true],
    ['returns true for February 29 in year zero', ['0000-02-29'], true],
    ['returns false for February 29 in a non-leap year', ['2025-02-29'], false],
    ['returns false for day after a 30-day month', ['2025-04-31'], false],
    ['returns false for day 00', ['2025-01-00'], false],
    ['returns false for month 00', ['2025-00-01'], false],
    ['returns false for month 13', ['2025-13-01'], false],
    ['returns false when month is not two digits', ['2025-1-01'], false],
    ['returns false when day is not two digits', ['2025-01-1'], false],
    ['returns false for non-calendar-date format', ['01/01/2025'], false],
    ['returns false for a Temporal calendar annotation', ['2025-01-01[u-ca=iso8601]'], false],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = isValidCalendarDate(...args);
    expect(actual).toBe(expected);
  });
});
