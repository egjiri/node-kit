import { toArray } from '.';

import type { Cases } from 'testing/helpers';

describe('test toArray function', () => {
  const cases: Cases<typeof toArray> = [
    ['normal use case', [3], [0, 1, 2]],
    ['zero use case', [0], []],
    ['zero use case', [-3], []],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = toArray(...args);
    expect(actual).toEqual(expected);
  });
});
