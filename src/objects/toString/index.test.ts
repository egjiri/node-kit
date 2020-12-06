import { toString } from '.';

import type { Cases } from 'testing/helpers';

describe('test toString function', () => {
  const cases: Cases<typeof toString> = [
    ['normal use case', [{ a: 1, b: 2 }], 'a: 1\nb: 2'],
    ['null use case', [{ a: 1, b: null }], 'a: 1'],
    ['undefined use case', [{ a: 1, b: undefined }], 'a: 1'],
    ['delimite use case', [{ a: 1, b: 2 }, ', '], 'a: 1, b: 2'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = toString(...args);
    expect(actual).toEqual(expected);
  });
});
