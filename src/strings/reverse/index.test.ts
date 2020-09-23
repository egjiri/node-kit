import { reverse } from '.';

describe('test reverse function', () => {
  const cases: [string, [string], string][] = [
    ['normal use case', ['edit'], 'tide'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = reverse(...args);
    expect(actual).toEqual(expected);
  });
});
