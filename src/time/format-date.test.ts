import { formatDate, formatStandardDate } from '.';

describe('formatDate', () => {
  it('formats date correctly', () => {
    const actual = formatDate(new Date(2025, 0, 15));
    const expected = 'Wed, Jan 15, 2025';
    expect(actual).toBe(expected);
  });
});

describe('formatStandardDate', () => {
  it('formats date correctly', () => {
    const actual = formatStandardDate(new Date(2025, 0, 15));
    const expected = '01/15/2025';
    expect(actual).toBe(expected);
  });
});
