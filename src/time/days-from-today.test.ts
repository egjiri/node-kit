import { daysFromToday } from '.';
import type { Cases } from 'testing';

const resolvedDateTimeFormatOptions = Intl.DateTimeFormat().resolvedOptions();

describe('daysFromToday', () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-05-12T12:00:00.000Z'));
    vi.spyOn(Intl.DateTimeFormat.prototype, 'resolvedOptions').mockReturnValue({
      ...resolvedDateTimeFormatOptions,
      timeZone: 'UTC',
    });
  });

  afterAll(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  const cases: Cases<typeof daysFromToday> = [
    ['returns zero for zero-day offset', ['0d'], 0],
    ['returns positive number for signed day offset', ['+3d'], 3],
    ['returns negative number for signed day offset', ['-2d'], -2],
    ['returns positive number for unsigned day offset', ['5d'], 5],
    ['returns zero for today calendar date', ['2025-05-12'], 0],
    ['returns positive number for future calendar date', ['2025-05-15'], 3],
    ['returns negative number for past calendar date', ['2025-05-09'], -3],
    ['returns null for empty string', [''], null],
    ['returns null for malformed day offset', ['1D'], null],
    ['returns null for plain number string', ['1'], null],
    ['returns null for non-date string', ['abc'], null],
    ['returns null for invalid calendar date', ['2025-02-29'], null],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = daysFromToday(...args);
    expect(actual).toBe(expected);
  });
});
