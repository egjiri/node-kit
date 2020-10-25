import { trim } from '.';

import type { Cases } from 'testing/helpers';

describe('test trim function', () => {
  const cases: Cases<typeof trim> = [
    ['normal use case', ['  spaces  '], 'spaces'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = trim(...args);
    expect(actual).toEqual(expected);
  });
});
