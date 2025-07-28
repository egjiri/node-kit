import { isStringArray } from '.';

import type { Cases } from 'testing/helpers';

describe('test isStringArray function', () => {
  const cases: Cases<typeof isStringArray> = [
    ['normal use case', [['hello', 'world', 'test']], true],
    ['empty array', [[]], true],
    ['array with mixed types', [['string', null, undefined, {}]], false],
    ['not an array - string', ['hello'], false],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = isStringArray(...args);
    expect(actual).toEqual(expected);
  });
});
