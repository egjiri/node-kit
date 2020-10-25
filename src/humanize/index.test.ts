import humanize from '.';

import type { Cases } from 'testing/helpers';

describe('test humanize function', () => {
  const cases: Cases<typeof humanize> = [
    ['underscore', ['family_friendly'], 'Family Friendly'],
    ['dashes', ['family-friendly'], 'Family Friendly'],
    ['spaces', ['family friendly'], 'Family Friendly'],
    ['number with percentage format', ['50', 'percentage'], '50%'],
    ['invalid value/format combination', ['text', 'percentage'], 'N/A'],
    ['percentage format with no value', [undefined, 'percentage'], 'N/A'],
    ['number with currency format', ['123.45', 'currency'], '$123.45'],
    ['large number with currency format', ['12345.6', 'currency'], '$12,345.6'],
    ['zero number with currency format', ['0', 'currency'], '$0'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = humanize(...args);
    expect(actual).toEqual(expected);
  });
});
