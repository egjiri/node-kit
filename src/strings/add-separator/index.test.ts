import { Cases } from 'testing/helpers';
import { addSeparator } from '.';

describe('test addSeparator function', () => {
  const cases: Cases<typeof addSeparator> = [
    ['normal use case', ['1234567890'], '1,234,567,890'],
    ['different separator use case', ['1234567890', '-'], '1-234-567-890'],
    ['blank use case', [''], ''],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = addSeparator(...args);
    expect(actual).toEqual(expected);
  });
});
