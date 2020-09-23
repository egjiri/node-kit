import { regexMatchInGroups, matchGroup } from '.';

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
