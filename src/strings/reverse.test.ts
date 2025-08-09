import { reverse } from './reverse';

import type { Cases } from 'testing';

describe('test reverse function', () => {
  const cases: Cases<typeof reverse> = [
    ['normal use case', ['edit'], 'tide'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = reverse(...args);
    expect(actual).toEqual(expected);
  });
});
