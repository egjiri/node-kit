import { Cases } from 'testing/helpers';
import { pluralize, pluralizeWithCount } from '.';

describe('test pluralize function', () => {
  const cases: Cases<typeof pluralize> = [
    ['normal use case', ['test'], 'tests'],
    ['singular count use case', ['test', 1], 'test'],
    ['plural count use case', ['test', 2], 'tests'],
    ['words ending in y use case', ['berry'], 'berries'],
    ['words ending in s use case', ['address'], 'addresses'],
    ['words ending in ch use case', ['search'], 'searches'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = pluralize(...args);
    expect(actual).toEqual(expected);
  });
});

describe('test pluralizeWithCount function', () => {
  const cases: Cases<typeof pluralizeWithCount> = [
    ['normal use case', [1, 'test'], '1 test'],
    ['plural use case', [2, 'test'], '2 tests'],
    ['irregular plural use case', [2, 'tooth', 'teeth'], '2 teeth'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = pluralizeWithCount(...args);
    expect(actual).toEqual(expected);
  });
});
