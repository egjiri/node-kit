import { isObject } from './is-object';
import type { Cases } from 'testing';

describe('test isObject function', () => {
  const cases: Cases<typeof isObject> = [
    ['object use case', [{ a: 1 }], true],
    ['null use case', [null], false],
    ['undefined use case', [undefined], false],
    ['string use case', ['a'], false],
    ['number use case', [1], false],
    ['array use case', [['a', 1]], false],
    ['date use case', [new Date()], false],
    ['map use case', [new Map()], false],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = isObject(...args);
    expect(actual).toEqual(expected);
  });
});
