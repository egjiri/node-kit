import { getNextBusinessDay } from './get-next-business-day';
import { RelativeTime } from './types';
import type { Cases } from 'testing';

describe('getNextBusinessDay', () => {
  const cases: Cases<typeof getNextBusinessDay> = [
    ['returns same date when already a business day', [new Date(2025, 8, 2)], new Date(2025, 8, 2)], // Tuesday, Sep 2, 2025
    ['returns next Monday when given a weekend day', [new Date(2025, 8, 6)], new Date(2025, 8, 8)], // Saturday -> Monday
    ['returns next business day when given a holiday', [new Date(2025, 11, 25)], new Date(2025, 11, 29)], // Dec 25 (Thu) -> Dec 29 (Mon)
    ['returns previous business day when timing is Earlier', [new Date(2025, 8, 7), RelativeTime.Earlier], new Date(2025, 8, 5)], // Sunday -> Friday
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = getNextBusinessDay(...args);
    expect(actual).toEqual(expected);
  });
});
