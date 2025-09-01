import { calculateAmountByFrequency } from './calculate-amount-by-frequency';
import { Frequency } from './types';
import type { Cases } from 'testing';

describe('calculateAmountByFrequency', () => {
  /* eslint-disable no-multi-spaces */
  const cases: Cases<typeof calculateAmountByFrequency> = [
    // Weekly to other frequencies
    ['weekly to weekly (same)',   [100, Frequency.Weekly, Frequency.Weekly], 100],
    ['weekly to biweekly',        [100, Frequency.Weekly, Frequency.Biweekly], 200],
    ['weekly to semi-monthly',    [100, Frequency.Weekly, Frequency.SemiMonthly], 216.66666666666666],
    ['weekly to monthly',         [100, Frequency.Weekly, Frequency.Monthly], 433.3333333333333],
    ['weekly to bimonthly',       [100, Frequency.Weekly, Frequency.Bimonthly], 866.6666666666666],
    ['weekly to quarterly',       [100, Frequency.Weekly, Frequency.Quarterly], 1300],
    ['weekly to triannually',     [100, Frequency.Weekly, Frequency.Triannually], 1733.3333333333333],
    ['weekly to yearly',          [100, Frequency.Weekly, Frequency.Yearly], 5200],

    // Monthly to other frequencies
    ['monthly to weekly',         [1300, Frequency.Monthly, Frequency.Weekly], 300],
    ['monthly to biweekly',       [1300, Frequency.Monthly, Frequency.Biweekly], 600],
    ['monthly to semi-monthly',   [1000, Frequency.Monthly, Frequency.SemiMonthly], 500],
    ['monthly to monthly (same)', [1000, Frequency.Monthly, Frequency.Monthly], 1000],
    ['monthly to bimonthly',      [1000, Frequency.Monthly, Frequency.Bimonthly], 2000],
    ['monthly to quarterly',      [1000, Frequency.Monthly, Frequency.Quarterly], 3000],
    ['monthly to triannually',    [1000, Frequency.Monthly, Frequency.Triannually], 4000],
    ['monthly to yearly',         [1000, Frequency.Monthly, Frequency.Yearly], 12000],

    // Yearly to other frequencies
    ['yearly to weekly',          [5200, Frequency.Yearly, Frequency.Weekly], 100],
    ['yearly to biweekly',        [5200, Frequency.Yearly, Frequency.Biweekly], 200],
    ['yearly to semi-monthly',    [12000, Frequency.Yearly, Frequency.SemiMonthly], 500],
    ['yearly to monthly',         [12000, Frequency.Yearly, Frequency.Monthly], 1000],
    ['yearly to bimonthly',       [12000, Frequency.Yearly, Frequency.Bimonthly], 2000],
    ['yearly to quarterly',       [12000, Frequency.Yearly, Frequency.Quarterly], 3000],
    ['yearly to triannually',     [12000, Frequency.Yearly, Frequency.Triannually], 4000],
    ['yearly to yearly (same)',   [12000, Frequency.Yearly, Frequency.Yearly], 12000],

    // Reciprocal frequency conversions
    ['weekly to yearly',          [100, Frequency.Weekly, Frequency.Yearly], 5200],
    ['biweekly to yearly',        [200, Frequency.Biweekly, Frequency.Yearly], 5200],
    ['semi-monthly to yearly',    [500, Frequency.SemiMonthly, Frequency.Yearly], 12000],
    ['monthly to yearly',         [1000, Frequency.Monthly, Frequency.Yearly], 12000],
    ['bimonthly to yearly',       [2000, Frequency.Bimonthly, Frequency.Yearly], 12000],
    ['quarterly to yearly',       [3000, Frequency.Quarterly, Frequency.Yearly], 12000],
    ['triannually to yearly',     [4000, Frequency.Triannually, Frequency.Yearly], 12000],

    // Edge cases
    ['zero amount',               [0, Frequency.Monthly, Frequency.Yearly], 0],
    ['negative amount',           [-1000, Frequency.Monthly, Frequency.Yearly], -12000],
    ['fractional amount',         [435.5, Frequency.Monthly, Frequency.Weekly], 100.5],
  ];
  /* eslint-enable no-multi-spaces */

  test.each(cases)('%s', (_, args, expected) => {
    const actual = calculateAmountByFrequency(...args);
    expect(actual).toBe(expected);
  });
});
