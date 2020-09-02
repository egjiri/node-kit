import { Format, formatNumber, toString } from '.';

describe('test formatNumber function', () => {
  const cases: [string, [number, Format?], string][] = [
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

describe('test toString function', () => {
  const cases: [string, [number, number?], string][] = [
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
