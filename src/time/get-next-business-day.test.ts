import { getNextBusinessDay } from './get-next-business-day';
import { RelativeTime } from './types';
import type { Cases } from 'testing';

describe('getNextBusinessDay', () => {
  const cases: Cases<typeof getNextBusinessDay> = [
    ['returns same date when already a business day', ['2025-09-02'], '2025-09-02'], // Tuesday, Sep 2, 2025
    ['returns next Monday when given a weekend day', ['2025-09-06'], '2025-09-08'], // Saturday -> Monday
    ['returns previous business day when timing is Earlier', ['2025-09-07', RelativeTime.Earlier], '2025-09-05'], // Sunday -> Friday,
    ['returns next business day when given a holiday', ['2025-12-25'], '2025-12-29'], // Dec 25 (Thu) -> Dec 29 (Mon)
    ['returns next business day with updated holidays after crossing year boundary', ['2023-12-31'], '2024-01-02'], // Dec 31, 2023 (Sun) -> Jan 2, 2024 (Tue)
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = getNextBusinessDay(...args);
    expect(actual).toBe(expected);
  });
});
