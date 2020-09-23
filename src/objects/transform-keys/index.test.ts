import { underscoreKeys, camelizeKeys, dasherizeKeys } from '.';

describe('test underscoreKeys function', () => {
  const cases: [string, [Record<string, unknown>], Record<string, unknown>][] = [
    [
      'normal use case',
      [{ 'first key': 1, 'second-key': 2, thirdKey: 3, fourth_key: 4 }],
      { first_key: 1, second_key: 2, third_key: 3, fourth_key: 4 },
    ],
    [
      'nested use case',
      [{ 'first key': 1, 'second-key': { thirdKey: 3, fourth_key: 4 }}],
      { first_key: 1, second_key: { third_key: 3, fourth_key: 4 }},
    ],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = underscoreKeys(...args);
    expect(actual).toEqual(expected);
  });
});

describe('test camelizeKeys function', () => {
  const cases: [string, [Record<string, unknown>], Record<string, unknown>][] = [
    [
      'normal use case',
      [{ 'first key': 1, 'second-key': 2, thirdKey: 3, fourth_key: 4 }],
      { firstKey: 1, secondKey: 2, thirdKey: 3, fourthKey: 4 },
    ],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = camelizeKeys(...args);
    expect(actual).toEqual(expected);
  });
});

describe('test dasherizeKeys function', () => {
  const cases: [string, [Record<string, unknown>], Record<string, unknown>][] = [
    [
      'normal use case',
      [{ 'first key': 1, 'second-key': 2, thirdKey: 3, fourth_key: 4 }],
      { 'first-key': 1, 'second-key': 2, 'third-key': 3, 'fourth-key': 4 },
    ],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = dasherizeKeys(...args);
    expect(actual).toEqual(expected);
  });
});
