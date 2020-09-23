import { underscore } from '.';

describe('test underscore function', () => {
  const cases: [string, [string], string][] = [
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
