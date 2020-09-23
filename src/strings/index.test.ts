import {
  addSeparator,
  camelize,
  capitalize, capitalizeWords, capitalizeSentences,
  dasherize,
  deDasherize,
  humanize,
  pluralize, pluralizeWithCount,
  regexMatchInGroups,
  reverse,
  toNumber,
  trim,
  underscore,
} from '.';


test('expors', () => {
  [
    addSeparator,
    camelize,
    capitalize, capitalizeWords, capitalizeSentences,
    dasherize,
    deDasherize,
    humanize,
    pluralize, pluralizeWithCount,
    regexMatchInGroups,
    reverse,
    toNumber,
    trim,
    underscore,
  ].map(item => expect(item).toBeDefined());
});
