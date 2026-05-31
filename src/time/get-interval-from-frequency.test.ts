import { getIntervalFromFrequency } from './get-interval-from-frequency';
import { Frequency } from './types';
import type { Cases } from 'testing';

describe('getIntervalFromFrequency', () => {
  const cases: Cases<typeof getIntervalFromFrequency> = [
    ['returns 52 for weekly frequency', [Frequency.Weekly], 52],
    ['returns 26 for biweekly frequency', [Frequency.Biweekly], 26],
    ['returns 24 for semi-monthly frequency', [Frequency.SemiMonthly], 24],
    ['returns 12 for monthly frequency', [Frequency.Monthly], 12],
    ['returns 6 for bimonthly frequency', [Frequency.Bimonthly], 6],
    ['returns 4 for quarterly frequency', [Frequency.Quarterly], 4],
    ['returns 3 for triannually frequency', [Frequency.Triannually], 3],
    ['returns 1 for yearly frequency', [Frequency.Yearly], 1],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = getIntervalFromFrequency(...args);
    expect(actual).toBe(expected);
  });
});
