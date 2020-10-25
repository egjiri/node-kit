import { underscore } from '.';

import type { Cases } from 'testing/helpers';

describe('test underscore function', () => {
  const cases: Cases<typeof underscore> = [
    ['spaces use case', ['with spaces'], 'with_spaces'],
    ['dashes use case', ['with-dashes'], 'with_dashes'],
    ['camelcased use case', ['camelCased'], 'camel_cased'],
    ['extra spaces', ['  more  spaces  '], 'more_spaces'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = underscore(...args);
    expect(actual).toEqual(expected);
  });
});
