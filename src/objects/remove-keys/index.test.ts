import { removeKeys, removeKeysWithBlankValues } from '.';

import type { Cases } from 'testing/helpers';

describe('test removeKeys function', () => {
  const cases: Cases<typeof removeKeys> = [
    ['normal use case', [{ a: 1, b: 2, c: 3 }, 'a', 'c'], { b: 2 }],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = removeKeys(...args);
    expect(actual).toEqual(expected);
  });
});

describe('test removeKeysWithBlankValues function', () => {
  const cases: Cases<typeof removeKeysWithBlankValues> = [
    ['normal use case', [{ a: 1, b: 2 }], { a: 1, b: 2 }],
    ['null use case', [{ a: 1, b: null }], { a: 1 }],
    ['undefined use case', [{ a: 1, b: undefined }], { a: 1 }],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = removeKeysWithBlankValues(...args);
    expect(actual).toEqual(expected);
  });
});
