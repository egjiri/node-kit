import { addDays } from '.';
import type { Cases } from 'testing';

describe('addDays', () => {
  const cases: Cases<typeof addDays> = [
    ['add positive days', [new Date('2025-01-15'), 5], new Date('2025-01-20')],
    ['add zero days, same calendar date (new date instance)', [new Date('2025-01-15'), 0], new Date('2025-01-15')],
    ['subtract days', [new Date('2025-01-15'), -10], new Date('2025-01-05')],
    ['roll over month end', [new Date('2025-01-31'), 1], new Date('2025-02-01')],
    ['handle leap year Feb 28 -> Feb 29', [new Date('2024-02-28'), 1], new Date('2024-02-29')],
    ['handle non-leap year Feb 28 -> Mar 1', [new Date('2025-02-28'), 1], new Date('2025-03-01')],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = addDays(...args);
    expect(actual.getTime()).toBe(expected.getTime());
  });
});
