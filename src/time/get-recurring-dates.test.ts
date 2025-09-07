import { getRecurringDates, isRecurringTransactionSupportedFrequency } from './get-recurring-dates';
import { Frequency, DayOfWeek } from './types';
import type { Cases } from 'testing';

describe('getRecurringDates', () => {
  beforeAll(() => {
    // Mock Date constructor to return fixed data for new Date() calls
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2025, 8, 6)); // September 6, 2025
  });

  afterAll(() => {
    // Restore real timers
    vi.useRealTimers();
  });

  const cases: Cases<typeof getRecurringDates> = [
    [
      'returns weekly dates for Monday',
      [Frequency.Weekly, [DayOfWeek.Monday], new Date(2025, 0, 1), new Date(2025, 0, 31)],
      [
        new Date(2025, 0, 6), // January 6, 2025 (Monday)
        new Date(2025, 0, 13), // January 13, 2025 (Monday)
        new Date(2025, 0, 20), // January 20, 2025 (Monday)
        new Date(2025, 0, 27), // January 27, 2025 (Monday)
      ],
    ],
    [
      'returns monthly dates for day 15',
      [Frequency.Monthly, [15], new Date(2025, 0, 1), new Date(2025, 2, 31)],
      [
        new Date(2025, 0, 15),
        new Date(2025, 1, 15),
        new Date(2025, 2, 15),
      ],
    ],
    [
      'returns semi-monthly dates for days 1 and 15',
      [Frequency.SemiMonthly, [1, 15], new Date(2025, 0, 1), new Date(2025, 1, 28)],
      [
        new Date(2025, 0, 1),
        new Date(2025, 1, 1),
        new Date(2025, 0, 15),
        new Date(2025, 1, 15),
      ],
    ],
    [
      'returns yearly dates (with default end date)',
      [Frequency.Yearly, undefined, new Date(2023, 5, 15)],
      [
        new Date(2023, 5, 15),
        new Date(2024, 5, 15),
        new Date(2025, 5, 15),
        new Date(2026, 5, 15),
      ],
    ],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = getRecurringDates(...args);
    expect(actual).toEqual(expected);
  });

  test('throws error for weekly frequency with invalid day type', () => {
    expect(() => {
      getRecurringDates(Frequency.Weekly, [15] as unknown as DayOfWeek[], new Date(2025, 0, 1), new Date(2025, 0, 31));
    }).toThrow('Invalid "startDay"! It must be a DayOfWeek when frequency is Weekly');
  });

  test('throws error when days array is empty', () => {
    expect(() => {
      getRecurringDates(Frequency.Weekly, [], new Date(2025, 0, 1), new Date(2025, 0, 31));
    }).toThrow('Invalid "days"! It must be a non-empty array of DayOfWeek[] or DayOfMonth[]');
  });

  test('throws error for semi-monthly frequency with invalid day type', () => {
    expect(() => {
      getRecurringDates(Frequency.SemiMonthly, ['invalid'] as unknown as number[], new Date(2025, 0, 1), new Date(2025, 0, 31));
    }).toThrow('Invalid "days"! All elements must be DayOfMonth when frequency is SemiMonthly or Monthly');
  });

  test('throws error for monthly frequency with invalid day type', () => {
    expect(() => {
      getRecurringDates(Frequency.Monthly, ['invalid'] as unknown as number[], new Date(2025, 0, 1), new Date(2025, 0, 31));
    }).toThrow('Invalid "days"! All elements must be DayOfMonth when frequency is SemiMonthly or Monthly');
  });

  test('throws error for unsupported frequency', () => {
    expect(() => {
      getRecurringDates(Frequency.Biweekly as never, [1], new Date(2025, 0, 1), new Date(2025, 0, 31));
    }).toThrow('Unsupported frequency: biweekly');
  });
});

describe('isRecurringTransactionSupportedFrequency', () => {
  const cases: Cases<typeof isRecurringTransactionSupportedFrequency> = [
    ['returns true for Weekly frequency', [Frequency.Weekly], true],
    ['returns true for SemiMonthly frequency', [Frequency.SemiMonthly], true],
    ['returns true for Monthly frequency', [Frequency.Monthly], true],
    ['returns true for Yearly frequency', [Frequency.Yearly], true],
    ['returns false for Biweekly frequency', [Frequency.Biweekly], false],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = isRecurringTransactionSupportedFrequency(...args);
    expect(actual).toBe(expected);
  });
});
