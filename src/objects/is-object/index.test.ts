import { isObject } from '.';

describe('test isObject function', () => {
  const cases: [string, [unknown], boolean][] = [
    ['object use case', [{ a: 1 }], true],
    ['null use case', [null], false],
    ['undefined use case', [undefined], false],
    ['string use case', ['a'], false],
    ['number use case', [1], false],
    ['array use case', [['a', 1]], false],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = isObject(...args);
    expect(actual).toEqual(expected);
  });
});
