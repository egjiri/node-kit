import { getYearlyDates } from './get-yearly-dates';
import type { Cases } from 'testing';

describe('getYearlyDates', () => {
  const cases: Cases<typeof getYearlyDates> = [
    [
      'returns yearly dates over a 3-year period',
      ['2023-06-15', '2025-06-15'],
      [
        '2023-06-15',
        '2024-06-15',
        '2025-06-15',
      ],
    ],
    [
      'returns yearly dates that re-anchor to February 29 in later leap years',
      ['2024-02-29', '2028-02-29'],
      [
        '2024-02-29',
        '2025-02-28',
        '2026-02-28',
        '2027-02-28',
        '2028-02-29',
      ],
    ],
    [
      'returns single date when start and end are in same year',
      ['2025-04-10', '2025-09-20'],
      ['2025-04-10'],
    ],
    [
      'returns empty array when end date is before start date',
      ['2025-01-01', '2024-12-31'],
      [],
    ],
    [
      'handles exact year boundary dates',
      ['2023-12-31', '2023-12-31'],
      ['2023-12-31'],
    ],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = getYearlyDates(...args);
    expect(actual).toEqual(expected);
  });
});
