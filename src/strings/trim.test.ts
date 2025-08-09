import { trim } from './trim';

import type { Cases } from 'testing';

describe('test trim function', () => {
  const cases: Cases<typeof trim> = [
    ['normal use case', ['  spaces  '], 'spaces'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = trim(...args);
    expect(actual).toEqual(expected);
  });
});
