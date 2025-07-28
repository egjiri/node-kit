import { filterDuplicates } from '.';

import type { Cases } from 'testing/helpers';

describe('test filterDuplicates function', () => {
  const cases: Cases<typeof filterDuplicates> = [
    ['array with primitive duplicates', [[1, 2, 2, 3, 1, 4]], [1, 2, 3, 4]],
    ['array with string duplicates', [['apple', 'banana', 'apple', 'cherry']], ['apple', 'banana', 'cherry']],
    ['array with object duplicates', [[{ id: 1 }, { id: 2 }, { id: 1 }, { id: 3 }]], [{ id: 1 }, { id: 2 }, { id: 3 }]],
    ['array with no duplicates', [[1, 2, 3, 4]], [1, 2, 3, 4]],
    ['empty array', [[]], []],
    ['array with complex objects', [[{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }, { name: 'John', age: 30 }]], [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }]],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = filterDuplicates(...args);
    expect(actual).toEqual(expected);
  });
});
