import { getYearlyDates } from './get-yearly-dates';
import type { Cases } from 'testing';

describe('getYearlyDates', () => {
  const cases: Cases<typeof getYearlyDates> = [
    [
      'returns yearly dates over a 3-year period',
      [new Date(2023, 5, 15), new Date(2025, 5, 15)],
      [
        new Date(2023, 5, 15),
        new Date(2024, 5, 15),
        new Date(2025, 5, 15),
      ],
    ],
    [
      'returns yearly dates for leap year handling',
      [new Date(2024, 1, 29), new Date(2026, 1, 28)],
      [
        new Date(2024, 1, 29),
        new Date(2025, 1, 28),
        new Date(2026, 1, 28),
      ],
    ],
    [
      'returns single date when start and end are in same year',
      [new Date(2025, 3, 10), new Date(2025, 8, 20)],
      [new Date(2025, 3, 10)],
    ],
    [
      'returns empty array when end date is before start date',
      [new Date(2025, 0, 1), new Date(2024, 11, 31)],
      [],
    ],
    [
      'handles exact year boundary dates',
      [new Date(2023, 11, 31), new Date(2023, 11, 31)],
      [new Date(2023, 11, 31)],
    ],
  ];

  test.each(cases)('%s', (_, args, expected) => {
    const actual = getYearlyDates(...args);
    expect(actual).toEqual(expected);
  });
});
