import { getNumberOfDaysInYear } from './get-number-of-days-in-year';
import type { Cases } from 'testing';

describe('getNumberOfDaysInYear', () => {
  beforeAll(() => {
    // Mock Date constructor to return fixed data for new Date() calls
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2025, 8, 6)); // September 6, 2025
  });

  afterAll(() => {
    // Restore real timers
    vi.useRealTimers();
  });

  const cases: Cases<typeof getNumberOfDaysInYear> = [
    ['returns 365 for regular year 2025', [2025], 365],
    ['returns 366 for leap year 2024', [2024], 366],
    ['returns 365 for current year (mocked to always be 2025) when no parameter provided', [], 365],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = getNumberOfDaysInYear(...args);
    expect(actual).toBe(expected);
  });
});
