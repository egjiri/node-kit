import { formatDate, formatStandardDate } from '.';
import type { Cases } from 'testing';

describe('formatDate', () => {
  const cases: Cases<typeof formatDate> = [
    ['format date', [new Date(2025, 0, 15)], 'Wed, Jan 15, 2025'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = formatDate(...args);
    expect(actual).toBe(expected);
  });
});

describe('formatStandardDate', () => {
  const cases: Cases<typeof formatStandardDate> = [
    ['format date', [new Date(2025, 0, 15)], '01/15/2025'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = formatStandardDate(...args);
    expect(actual).toBe(expected);
  });
});
