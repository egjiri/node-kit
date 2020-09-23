import { swapKeysAndValues } from '.';

describe('test swapKeysAndValues function', () => {
  const cases: [string, [Record<string, string>], Record<string, string>][] = [
    ['normal use case', [{ a: 'b', c: 'd' }], { b: 'a', d: 'c' }],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = swapKeysAndValues(...args);
    expect(actual).toEqual(expected);
  });
});
