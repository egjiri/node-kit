import { toNumber } from '.';

import type { Cases } from 'testing/helpers';

describe('test toNumber function', () => {
  const cases: Cases<typeof toNumber> = [
    ['normal use case', ['123'], 123],
    ['number with decimals', ['123.45'], 123.45],
    ['invalid characters gets stripped out', ['a1b2c3.d4e5'], 123.45],
    ['negative number', ['-123'], -123],
    ['negative character not at the start', ['-12-3'], -123],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = toNumber(...args);
    expect(actual).toEqual(expected);
  });
});
