import { getRecurringDates, isRecurringTransactionSupportedFrequency } from './get-recurring-dates';
import { DayOfWeek, Frequency } from './types';
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
      [Frequency.Weekly, [DayOfWeek.Monday], '2025-01-01', '2025-01-31'],
      [
        '2025-01-06', // January 6, 2025 (Monday)
        '2025-01-13', // January 13, 2025 (Monday)
        '2025-01-20', // January 20, 2025 (Monday)
        '2025-01-27', // January 27, 2025 (Monday)
      ],
    ],
    [
      'returns monthly dates for day 15',
      [Frequency.Monthly, [15], '2025-01-01', '2025-03-31'],
      [
        '2025-01-15',
        '2025-02-15',
        '2025-03-15',
      ],
    ],
    [
      'returns semi-monthly dates for days 1 and 15',
      [Frequency.SemiMonthly, [1, 15], '2025-01-01', '2025-02-28'],
      [
        '2025-01-01',
        '2025-02-01',
        '2025-01-15',
        '2025-02-15',
      ],
    ],
    [
      'returns yearly dates (with default end date)',
      [Frequency.Yearly, undefined, '2023-06-15'],
      [
        '2023-06-15',
        '2024-06-15',
        '2025-06-15',
        '2026-06-15',
      ],
    ],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = getRecurringDates(...args);
    expect(actual).toEqual(expected);
  });

  test('throws error for weekly frequency with invalid day type', () => {
    expect(() => {
      getRecurringDates(Frequency.Weekly, [15] as unknown as DayOfWeek[], '2025-01-01', '2025-01-31');
    }).toThrow('Invalid "startDay"! It must be a DayOfWeek when frequency is Weekly');
  });

  test('throws error when days array is empty', () => {
    expect(() => {
      getRecurringDates(Frequency.Weekly, [], '2025-01-01', '2025-01-31');
    }).toThrow('Invalid "days"! It must be a non-empty array of DayOfWeek[] or DayOfMonth[]');
  });

  test('throws error for semi-monthly frequency with invalid day type', () => {
    expect(() => {
      getRecurringDates(Frequency.SemiMonthly, ['invalid'] as unknown as number[], '2025-01-01', '2025-01-31');
    }).toThrow('Invalid "days"! All elements must be DayOfMonth when frequency is SemiMonthly or Monthly');
  });

  test('throws error for monthly frequency with invalid day type', () => {
    expect(() => {
      getRecurringDates(Frequency.Monthly, ['invalid'] as unknown as number[], '2025-01-01', '2025-01-31');
    }).toThrow('Invalid "days"! All elements must be DayOfMonth when frequency is SemiMonthly or Monthly');
  });

  test('throws error for unsupported frequency', () => {
    expect(() => {
      getRecurringDates(Frequency.Biweekly as never, [1], '2025-01-01', '2025-01-31');
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
