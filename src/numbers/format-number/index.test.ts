import { formatNumber } from '.';

import type { Cases } from 'testing/helpers';

describe('test formatNumber function', () => {
  const cases: Cases<typeof formatNumber> = [
    ['percentage use case', [12, 'percentage'], '12%'],
    ['currency use case', [12, 'currency'], '$12'],
    ['large number use case', [1234.56, 'currency'], '$1,234.56'],
    ['no format use case', [1234.56], '1,234.56'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = formatNumber(...args);
    expect(actual).toEqual(expected);
  });
});
