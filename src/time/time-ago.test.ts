import { timeAgo } from './time-ago';
import type { Cases } from 'testing';

describe('timeAgo', () => {
  const now = new Date();

  const cases: Cases<typeof timeAgo> = [
    ['returns "now" for current time', [now], 'now'],
    ['returns seconds ago for recent time', [new Date(now.getTime() - 30 * 1000)], '30 seconds ago'],
    ['returns minutes ago for time within an hour', [new Date(now.getTime() - 15 * 60 * 1000)], '15 minutes ago'],
    ['returns hours ago for time within a day', [new Date(now.getTime() - 3 * 60 * 60 * 1000)], '3 hours ago'],
    ['returns days ago for older time', [new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)], '3 days ago'],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = timeAgo(...args);
    expect(actual).toBe(expected);
  });
});
