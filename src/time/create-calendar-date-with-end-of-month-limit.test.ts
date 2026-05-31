import { createCalendarDateWithEndOfMonthLimit } from './create-calendar-date-with-end-of-month-limit';
import { Month } from './types';
import type { Cases } from 'testing';

describe('createCalendarDateWithEndOfMonthLimit', () => {
  const cases: Cases<typeof createCalendarDateWithEndOfMonthLimit> = [
    ['returns exact date when day is before the end of month', [2025, Month.January, 15], '2025-01-15'],
    ['returns last day of month when requested day exceeds month length', [2025, Month.February, 30], '2025-02-28'],
    ['handles leap year February correctly', [2024, Month.February, 30], '2024-02-29'],
    ['returns last day for April when requesting 31st', [2025, Month.April, 31], '2025-04-30'],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = createCalendarDateWithEndOfMonthLimit(...args);
    expect(actual).toEqual(expected);
  });
});
