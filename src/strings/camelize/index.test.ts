import { camelize } from '.';

import type { Cases } from 'testing/helpers';

describe('test camelize function', () => {
  const cases: Cases<typeof camelize> = [
    ['spaces use case', ['spaces case'], 'spacesCase'],
    ['dashes use case', ['dashes-case'], 'dashesCase'],
    ['underscore use case', ['underscore_case'], 'underscoreCase'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = camelize(...args);
    expect(actual).toEqual(expected);
  });
});
