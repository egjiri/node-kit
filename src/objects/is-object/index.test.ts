import { isObject } from '.';

import type { Cases } from 'testing/helpers';

describe('test isObject function', () => {
  const cases: Cases<typeof isObject> = [
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
