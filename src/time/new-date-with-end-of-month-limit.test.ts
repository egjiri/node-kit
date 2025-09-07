import { newDateWithEndOfMonthLimit } from './new-date-with-end-of-month-limit';
import { Month } from './types';
import type { Cases } from 'testing';

describe('newDateWithEndOfMonthLimit', () => {
  const cases: Cases<typeof newDateWithEndOfMonthLimit> = [
    ['returns exact date when day is before the end of month', [2025, Month.January, 15], new Date(2025, Month.January, 15)],
    ['returns last day of month when requested day exceeds month length', [2025, Month.February, 30], new Date(2025, Month.February, 28)],
    ['handles leap year February correctly', [2024, Month.February, 30], new Date(2024, Month.February, 29)],
    ['returns last day for April when requesting 31st', [2025, Month.April, 31], new Date(2025, Month.April, 30)],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = newDateWithEndOfMonthLimit(...args);
    expect(actual).toEqual(expected);
  });
});
