import { isEmpty } from '.';

describe('test isEmpty function', () => {
  const cases: [string, [unknown[]], boolean][] = [
    ['normal use case', [['first', 'second', 'third']], false],
    ['empty array use case', [[]], true],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = isEmpty(...args);
    expect(actual).toEqual(expected);
  });
});
