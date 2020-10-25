import { deDasherize } from '.';

import type { Cases } from 'testing/helpers';

describe('test deDasherize function', () => {
  const cases: Cases<typeof deDasherize> = [
    ['normal use case', ['normal-case'], 'normal case'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = deDasherize(...args);
    expect(actual).toEqual(expected);
  });
});
