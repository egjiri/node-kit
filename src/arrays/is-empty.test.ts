import { isEmpty } from './is-empty';

import type { Cases } from 'testing';

describe('test isEmpty function', () => {
  const cases: Cases<typeof isEmpty> = [
    ['normal use case', [['first', 'second', 'third']], false],
    ['empty array use case', [[]], true],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = isEmpty(...args);
    expect(actual).toEqual(expected);
  });
});
