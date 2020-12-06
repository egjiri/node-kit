import { toArray } from '.';

import type { Cases } from 'testing/helpers';

describe('test toArray function', () => {
  const cases: Cases<typeof toArray> = [
    ['normal use case', [{ a: 1, b: 2 }], ['a: 1', 'b: 2']],
    ['null use case', [{ a: 1, b: null }], ['a: 1']],
    ['undefined use case', [{ a: 1, b: undefined }], ['a: 1']],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = toArray(...args);
    expect(actual).toEqual(expected);
  });
});
