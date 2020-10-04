import { Cases } from 'testing/helpers';
import { swapKeysAndValues } from '.';

describe('test swapKeysAndValues function', () => {
  const cases: Cases<typeof swapKeysAndValues> = [
    ['normal use case', [{ a: 'b', c: 'd' }], { b: 'a', d: 'c' }],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = swapKeysAndValues(...args);
    expect(actual).toEqual(expected);
  });
});
