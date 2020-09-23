import { camelize } from '.';

describe('test camelize function', () => {
  const cases: [string, [string], string][] = [
    ['spaces use case', ['spaces case'], 'spacesCase'],
    ['dashes use case', ['dashes-case'], 'dashesCase'],
    ['underscore use case', ['underscore_case'], 'underscoreCase'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = camelize(...args);
    expect(actual).toEqual(expected);
  });
});
