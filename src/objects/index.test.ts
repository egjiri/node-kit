import { underscoreKeys, camelizeKeys, dasherizeKeys, isObject, removeKeys, removeKeysWithBlankValues, swapKeysAndValues } from '.';

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

describe('test isObject function', () => {
  const cases: [string, [unknown], boolean][] = [
    ['object use case', [{ a: 1 }], true],
    ['null use case', [null], false],
    ['undefined use case', [undefined], false],
    ['string use case', ['a'], false],
    ['number use case', [1], false],
    ['array use case', [['a', 1]], false],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = isObject(...args);
    expect(actual).toEqual(expected);
  });
});

describe('test removeKeys function', () => {
  const cases: [string, [Record<string, unknown>, ...string[]], Record<string, unknown>][] = [
    ['normal use case', [{ a: 1, b: 2, c: 3 }, 'a', 'c'], { b: 2 }],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = removeKeys(...args);
    expect(actual).toEqual(expected);
  });
});

describe('test removeKeysWithBlankValues function', () => {
  const cases: [string, [Record<string, unknown>], Record<string, unknown>][] = [
    ['normal use case', [{ a: 1, b: 2 }], { a: 1, b: 2 }],
    ['null use case', [{ a: 1, b: null }], { a: 1 }],
    ['undefined use case', [{ a: 1, b: undefined }], { a: 1 }],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = removeKeysWithBlankValues(...args);
    expect(actual).toEqual(expected);
  });
});

describe('test swapKeysAndValues function', () => {
  const cases: [string, [Record<string, string>], Record<string, string>][] = [
    ['normal use case', [{ a: 'b', c: 'd' }], { b: 'a', d: 'c' }],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = swapKeysAndValues(...args);
    expect(actual).toEqual(expected);
  });
});
