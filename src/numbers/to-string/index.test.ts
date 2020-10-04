import { Cases } from 'testing/helpers';
import { toString } from '.';

describe('test toString function', () => {
  const cases: Cases<typeof toString> = [
    ['simple number', [12], '12'],
    ['large number', [12345], '12,345'],
    ['large number with decimals', [12345.6], '12,345.6'],
    ['number with set number of decimals', [12345.6, 2], '12,345.60'],
    ['number with no decimals', [12345.6, 0], '12,345'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = toString(...args);
    expect(actual).toEqual(expected);
  });
});
