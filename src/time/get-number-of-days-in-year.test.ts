import { getNumberOfDaysInYear } from './get-number-of-days-in-year';
import type { Cases } from 'testing';

describe('getNumberOfDaysInYear', () => {
  beforeAll(() => {
    jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2025);
  });

  afterAll(() => {
    jest.restoreAllMocks();
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
