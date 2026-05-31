import { addYears, Month } from '.';
import type { Cases } from 'testing';

describe('addYears', () => {
  const cases: Cases<typeof addYears> = [
    ['add positive years', [new Date(2025, Month.January, 15), 5], new Date(2030, Month.January, 15)],
    ['add zero years', [new Date(2025, Month.January, 15), 0], new Date(2025, Month.January, 15)],
    ['subtract years', [new Date(2025, Month.January, 15), -10], new Date(2015, Month.January, 15)],
    ['handle leap year Feb 29 -> stays Feb 29 when resulting year is leap', [new Date(2024, Month.February, 29), 4], new Date(2028, Month.February, 29)],
    ['handle leap year Feb 29 -> shifts to Feb 28 when resulting year not leap', [new Date(2024, Month.February, 29), 1], new Date(2025, Month.February, 28)],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = addYears(...args);
    expect(actual.getTime()).toBe(expected.getTime());
  });
});
