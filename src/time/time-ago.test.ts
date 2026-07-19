import { timeAgo } from './time-ago';
import type { Cases } from 'testing';

describe('timeAgo', () => {
  const now = new Date('2026-01-01T00:00:00.000Z');

  beforeAll(() => {
    vi.spyOn(Date, 'now').mockReturnValue(now.getTime());
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  const cases: Cases<typeof timeAgo> = [
    ['returns "now" for current time', [now], 'now'],
    ['returns seconds ago for recent time', [new Date(now.getTime() - 30 * 1000)], '30 seconds ago'],
    ['returns minutes ago for time within an hour', [new Date(now.getTime() - 15 * 60 * 1000)], '15 minutes ago'],
    ['returns hours ago for time within a day', [new Date(now.getTime() - 3 * 60 * 60 * 1000)], '3 hours ago'],
    ['returns "1 day ago" instead of "yesterday"', [new Date(now.getTime() - 24 * 60 * 60 * 1000)], '1 day ago'],
    ['returns days ago for older time', [new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)], '3 days ago'],
    ['returns months for months-old time', [new Date(now.getTime() - 40 * 24 * 60 * 60 * 1000)], '1 month ago'],
    ['returns years for years-old time', [new Date(now.getTime() - 400 * 24 * 60 * 60 * 1000)], '1 year ago'],
    ['returns narrow "now" for current time', [now, 'narrow'], 'now'],
    ['returns narrow seconds', [new Date(now.getTime() - 30 * 1000), 'narrow'], '30s ago'],
    ['returns narrow minutes', [new Date(now.getTime() - 15 * 60 * 1000), 'narrow'], '15m ago'],
    ['returns narrow hours', [new Date(now.getTime() - 3 * 60 * 60 * 1000), 'narrow'], '3h ago'],
    ['returns narrow "1d ago" instead of "yesterday"', [new Date(now.getTime() - 24 * 60 * 60 * 1000), 'narrow'], '1d ago'],
    ['returns narrow days', [new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), 'narrow'], '3d ago'],
    ['returns narrow months', [new Date(now.getTime() - 40 * 24 * 60 * 60 * 1000), 'narrow'], '1mo ago'],
    ['returns narrow years', [new Date(now.getTime() - 400 * 24 * 60 * 60 * 1000), 'narrow'], '1y ago'],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = timeAgo(...args);
    expect(actual).toBe(expected);
  });
});
