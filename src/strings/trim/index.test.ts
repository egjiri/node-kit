import { Cases } from 'testing/helpers';
import { trim } from '.';

describe('test trim function', () => {
  const cases: Cases<typeof trim> = [
    ['normal use case', ['  spaces  '], 'spaces'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = trim(...args);
    expect(actual).toEqual(expected);
  });
});
