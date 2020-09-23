import { dasherize } from '.';

describe('test dasherize function', () => {
  const cases: [string, [string], string][] = [
    ['normal use case', ['NormalCase'], 'normal-case'],
    ['spaces use case', ['spaces case'], 'spaces-case'],
    ['underscore use case', ['underscore_case'], 'underscore-case'],
    ['capitals and spaces use case', ['Capitals and Spaces'], 'capitals-and-spaces'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = dasherize(...args);
    expect(actual).toEqual(expected);
  });
});
