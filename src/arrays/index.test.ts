import { nextItem, previousItem } from '.';

describe('test nextItem function', () => {
  const cases: [string, [unknown[], unknown], string][] = [
    ['normal use case', [['first', 'second', 'third'], 'second'], 'third'],
    ['item at the end of list', [['first', 'second', 'third'], 'third'], 'first'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = nextItem(...args);
    expect(actual).toEqual(expected);
  });
});

describe('test previousItem function', () => {
  const cases: [string, [unknown[], unknown], string][] = [
    ['normal use case', [['first', 'second', 'third'], 'second'], 'first'],
    ['item at the beginning of list', [['first', 'second', 'third'], 'first'], 'third'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = previousItem(...args);
    expect(actual).toEqual(expected);
  });
});
