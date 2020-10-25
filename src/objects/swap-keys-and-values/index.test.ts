import { swapKeysAndValues } from '.';

import type { Cases } from 'testing/helpers';

describe('test swapKeysAndValues function', () => {
  const cases: Cases<typeof swapKeysAndValues> = [
    ['normal use case', [{ a: 'b', c: 'd' }], { b: 'a', d: 'c' }],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = swapKeysAndValues(...args);
    expect(actual).toEqual(expected);
  });
});
