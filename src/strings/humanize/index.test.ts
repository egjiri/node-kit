import { humanize } from '.';

describe('test humanize function', () => {
  const cases: [string, [string], string][] = [
    ['underscore use case', ['example_string'], 'Example String'],
    ['dashes use case', ['example-string'], 'Example String'],
    ['spaces use case', ['example string'], 'Example String'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = humanize(...args);
    expect(actual).toEqual(expected);
  });
});
