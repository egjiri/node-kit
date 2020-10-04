import { Cases } from 'testing/helpers';
import { firstObject, lastObject, nextObject, previousObject } from '.';

describe('test firstObject function', () => {
  const cases: Cases<typeof firstObject> = [
    ['normal use case', [['first', 'second', 'third']], 'first'],
    ['empty array use case', [[]], null],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = firstObject(...args);
    expect(actual).toEqual(expected);
  });
});

describe('test lastObject function', () => {
  const cases: Cases<typeof lastObject> = [
    ['normal use case', [['first', 'second', 'third']], 'third'],
    ['empty array use case', [[]], null],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = lastObject(...args);
    expect(actual).toEqual(expected);
  });
});

describe('test nextObject function', () => {
  const cases: Cases<typeof nextObject> = [
    ['normal use case', [['first', 'second', 'third'], 'second'], 'third'],
    ['item at the end of list', [['first', 'second', 'third'], 'third'], null],
    ['item at the end of list with repeat', [['first', 'second', 'third'], 'third', true], 'first'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = nextObject(...args);
    expect(actual).toEqual(expected);
  });
});

describe('test previousObject function', () => {
  const cases: Cases<typeof previousObject> = [
    ['normal use case', [['first', 'second', 'third'], 'second'], 'first'],
    ['item at the beginning of list', [['first', 'second', 'third'], 'first'], null],
    ['item at the beginning of list with repeat', [['first', 'second', 'third'], 'first', true], 'third'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = previousObject(...args);
    expect(actual).toEqual(expected);
  });
});
