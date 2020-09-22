import {
  trim,
  underscore,
  capitalize,
  capitalizeWords,
  capitalizeSentences,
  reverse,
  humanize,
  addSeparator,
  toNumber,
  dasherize,
  deDasherize,
  camelize,
  pluralize,
  pluralizeWithCount,
  regexMatchInGroups,
  matchGroup,
} from '.';

describe('test trim function', () => {
  const cases: [string, [string], string][] = [
    ['normal use case', ['  spaces  '], 'spaces'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = trim(...args);
    expect(actual).toEqual(expected);
  });
});

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

describe('test capitalize function', () => {
  const cases: [string, [string], string][] = [
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
  const cases: [string, [string], string][] = [
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
  const cases: [string, [string], string][] = [
    ['normal use case', ['this is the first sentence. this is the second one'], 'This is the first sentence. This is the second one'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = capitalizeSentences(...args);
    expect(actual).toEqual(expected);
  });
});

describe('test reverse function', () => {
  const cases: [string, [string], string][] = [
    ['normal use case', ['edit'], 'tide'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = reverse(...args);
    expect(actual).toEqual(expected);
  });
});

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

describe('test addSeparator function', () => {
  const cases: [string, [string, string?], string][] = [
    ['normal use case', ['1234567890'], '1,234,567,890'],
    ['different separator use case', ['1234567890', '-'], '1-234-567-890'],
    ['blank use case', [''], ''],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = addSeparator(...args);
    expect(actual).toEqual(expected);
  });
});

describe('test toNumber function', () => {
  const cases: [string, [string], number][] = [
    ['normal use case', ['123'], 123],
    ['number with decimals', ['123.45'], 123.45],
    ['invalid characters gets stripped out', ['a1b2c3.d4e5'], 123.45],
    ['negative number', ['-123'], -123],
    ['negative character not at the start', ['-12-3'], -123],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = toNumber(...args);
    expect(actual).toEqual(expected);
  });
});

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

describe('test deDasherize function', () => {
  const cases: [string, [string], string][] = [
    ['normal use case', ['normal-case'], 'normal case'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = deDasherize(...args);
    expect(actual).toEqual(expected);
  });
});

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

describe('test pluralize function', () => {
  const cases: [string, [string, number?], string][] = [
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
  const cases: [string, [number, string, string?], string][] = [
    ['normal use case', [1, 'test'], '1 test'],
    ['plural use case', [2, 'test'], '2 tests'],
    ['irregular plural use case', [2, 'tooth', 'teeth'], '2 teeth'],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = pluralizeWithCount(...args);
    expect(actual).toEqual(expected);
  });
});

describe('test regexMatchInGroups function', () => {
  const cases: [string, [string, string], matchGroup][] = [
    ['normal use case', ['toronto-on-area', '(?<city>[A-Za-z\\-]+)-(?<provinceCode>on|ab|bc)-area'], { city: 'toronto', provinceCode: 'on' }],
    ['no match use case', ['invalid', '(?<city>[A-Za-z\\-]+)-(?<provinceCode>on|ab|bc)-area'], {}],
    ['no groups use case', ['toronto-on-area', '([A-Za-z\\-]+)-(on|ab|bc)-area'], {}],
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = regexMatchInGroups(...args);
    expect(actual).toEqual(expected);
  });
});
