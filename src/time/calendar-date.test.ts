import {
  addDaysToCalendarDate,
  calendarDateToLocalDate,
  createCalendarDate,
  isValidCalendarDate,
  normalizeToCalendarDate,
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
    ['zero-pads month and day', [2030, Month.January, 1], '2030-01-01'],
    ['accepts February 29 in a leap year', [2024, Month.February, 29], '2024-02-29'],
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

describe('normalizeToCalendarDate', () => {
  const cases: Cases<typeof normalizeToCalendarDate> = [
    ['returns a YYYY-MM-DD calendar date unchanged', ['2025-01-15'], '2025-01-15'],
    ['converts an MM/DD/YYYY date to a calendar date', ['01/15/2025'], '2025-01-15'],
    ['preserves years below 100', ['12/31/0099'], '0099-12-31'],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = normalizeToCalendarDate(...args);
    expect(actual).toBe(expected);
  });

  const invalidCases = [
    ['throws for unsupported date formats', '2025-1-15', 'Invalid calendar date string: 2025-1-15. Expected MM/DD/YYYY or YYYY-MM-DD.'],
    ['throws for invalid calendar dates', '2025-02-29', 'Invalid calendar date string: 2025-02-29. Expected a valid calendar date.'],
    ['throws for invalid MM/DD/YYYY calendar dates', '02/29/2025', 'Invalid calendar date string: 02/29/2025. Expected a valid calendar date.'],
  ];

  test.each(invalidCases)('%s', (_, value, expected) => {
    const actual = () => normalizeToCalendarDate(value);
    expect(actual).toThrow(expected);
  });
});

describe('addDaysToCalendarDate', () => {
  const cases: Cases<typeof addDaysToCalendarDate> = [
    ['adds days to a calendar date', ['2025-01-15', 5], '2025-01-20'],
    ['subtracts days across a month boundary', ['2025-03-01', -1], '2025-02-28'],
    ['handles leap days', ['2024-02-28', 1], '2024-02-29'],
    ['preserves years below 100', ['0099-12-31', 1], '0100-01-01'],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = addDaysToCalendarDate(...args);
    expect(actual).toBe(expected);
  });
});

describe('calendarDateToLocalDate', () => {
  test('returns a date at local midnight', () => {
    const actual = calendarDateToLocalDate('2030-05-31');

    expect(actual.getFullYear()).toBe(2030);
    expect(actual.getMonth()).toBe(Month.May);
    expect(actual.getDate()).toBe(31);
    expect(actual.getHours()).toBe(0);
    expect(actual.getMinutes()).toBe(0);
    expect(actual.getSeconds()).toBe(0);
    expect(actual.getMilliseconds()).toBe(0);
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
  test('returns a date at UTC midnight', () => {
    const actual = toUtcMidnight('2030-05-31');
    expect(actual.toISOString()).toBe('2030-05-31T00:00:00.000Z');
  });
});

describe('toCalendarDate', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const cases: Cases<typeof toCalendarDate> = [
    ['formats a date as YYYY-MM-DD', [new Date('2025-07-15T12:00:00.000Z')], '2025-07-15'],
    ['formats dates using UTC date components by default', [new Date('2025-01-01T04:59:59.000Z')], '2025-01-01'],
    ['formats dates using the provided time zone', [new Date('2025-01-01T04:59:59.000Z'), 'America/Toronto'], '2024-12-31'],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = toCalendarDate(...args);
    expect(actual).toBe(expected);
  });

  test('throws when Intl formats an invalid calendar date', () => {
    vi.spyOn(Intl.DateTimeFormat.prototype, 'formatToParts').mockReturnValue([
      { type: 'year', value: '2025' },
      { type: 'month', value: '02' },
      { type: 'day', value: '30' },
    ]);

    expect(() => toCalendarDate(new Date('2025-02-01T00:00:00.000Z'))).toThrow('Invalid calendar date: 2025-02-30');
  });

  test('throws when Intl omits a required calendar date part', () => {
    vi.spyOn(Intl.DateTimeFormat.prototype, 'formatToParts').mockReturnValue([
      { type: 'year', value: '2025' },
      { type: 'month', value: '02' },
    ]);

    expect(() => toCalendarDate(new Date('2025-02-01T00:00:00.000Z'))).toThrow(
      'Unable to format calendar date: missing day',
    );
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
    ['returns false for February 29 in a non-leap year', ['2025-02-29'], false],
    ['returns false for day after a 30-day month', ['2025-04-31'], false],
    ['returns false for day 00', ['2025-01-00'], false],
    ['returns false for month 00', ['2025-00-01'], false],
    ['returns false for month 13', ['2025-13-01'], false],
    ['returns false when month is not two digits', ['2025-1-01'], false],
    ['returns false when day is not two digits', ['2025-01-1'], false],
    ['returns false for non-calendar-date format', ['01/01/2025'], false],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = isValidCalendarDate(...args);
    expect(actual).toBe(expected);
  });
});
