import { capitalize, capitalizeWords, capitalizeSentences } from '.';

import type { Cases } from 'testing/helpers';

describe('test capitalize function', () => {
  const cases: Cases<typeof capitalize> = [
    ['single word capitalizes the first character', ['word'], 'Word'],
    ['multiple words only capitalize the first', ['two words'], 'Two words'],
    ['starting with a number does not chang the string', ['1password'], '1password'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = capitalize(...args);
    expect(actual).toEqual(expected);
  });
});

describe('test capitalizeWords function', () => {
  const cases: Cases<typeof capitalizeWords> = [
    ['multiple words capitalize each word', ['two words'], 'Two Words'],
    ['ignore exception words when capitalizing', ['it is not a great idea to go outside these days'], 'It is Not a Great Idea to Go Outside These Days'],
    ['capitals present in the words are retained', ['WIRED magazine'], 'WIRED Magazine'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = capitalizeWords(...args);
    expect(actual).toEqual(expected);
  });
});

describe('test capitalizeSentences function', () => {
  const cases: Cases<typeof capitalizeSentences> = [
    ['normal use case', ['this is the first sentence. this is the second one'], 'This is the first sentence. This is the second one'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = capitalizeSentences(...args);
    expect(actual).toEqual(expected);
  });
});
