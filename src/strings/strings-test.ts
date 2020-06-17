import { test } from 'qunit';
import { capitalize, capitalizeWords, capitalizeSentences, reverse, humanize, addSeparator, toNumber, dasherize, deDasherize, camelize, pluralize, regexMatchInGroups } from './strings';

test('test capitalize function', function(assert) {
  const tests: [string, [string], string][] = [
    ['single word capitalizes the first character', ['word'], 'Word'],
    ['multiple words only capitalize the first', ['two words'], 'Two words'],
    ['starting with a number does not chang the string', ['1password'], '1password'],
  ];
  tests.forEach(t => {
    const [name, args, want] = t;
    assert.equal(capitalize(...args), want, name);
  });
});

test('test capitalizeWords function', function(assert) {
  const tests: [string, [string], string][] = [
    ['multiple words capitalize each word', ['two words'], 'Two Words'],
    ['ignore exception words when capitalizing', ['it is not a great idea to go outside these days'], 'It is Not a Great Idea to Go Outside These Days'],
    ['capitals present in the words are retained', ['WIRED magazine'], 'WIRED Magazine'],
  ];
  tests.forEach(t => {
    const [name, args, want] = t;
    assert.equal(capitalizeWords(...args), want, name);
  });
});

test('test capitalizeSentences function', function(assert) {
  const tests: [string, [string], string][] = [
    ['normal use case', ['this is the first sentence. this is the second one'], 'This is the first sentence. This is the second one'],
  ];
  tests.forEach(t => {
    const [name, args, want] = t;
    assert.equal(capitalizeSentences(...args), want, name);
  });
});

test('test reverse function', function(assert) {
  const tests: [string, [string], string][] = [
    ['normal use case', ['edit'], 'tide'],
  ];
  tests.forEach(t => {
    const [name, args, want] = t;
    assert.equal(reverse(...args), want, name);
  });
});

test('test humanize function', function(assert) {
  const tests: [string, [string], string][] = [
    ['underscore use case', ['example_string'], 'Example String'],
    ['dashes use case', ['example-string'], 'Example String'],
    ['spaces use case', ['example string'], 'Example String'],
  ];
  tests.forEach(t => {
    const [name, args, want] = t;
    assert.equal(humanize(...args), want, name);
  });
});

test('test addSeparator function', function(assert) {
  const tests: [string, [string, string?], string][] = [
    ['normal use case', ['1234567890'], '1,234,567,890'],
    ['different separator use case', ['1234567890', '-'], '1-234-567-890'],
  ];
  tests.forEach(t => {
    const [name, args, want] = t;
    const [str, separator] = args;
    assert.equal(addSeparator(str, separator), want, name);
  });
});

test('test toNumber function', function(assert) {
  const tests: [string, [string], number][] = [
    ['normal use case', ['123'], 123],
    ['number with decimals', ['123.45'], 123.45],
    ['invalid characters gets stripped out', ['a1b2c3.d4e5'], 123.45],
    ['negative number', ['-123'], -123],
    ['negative character not at the start', ['-12-3'], -123],
  ];
  tests.forEach(t => {
    const [name, args, want] = t;
    assert.equal(toNumber(...args), want, name);
  });
});

test('test dasherize function', function(assert) {
  const tests: [string, [string], string][] = [
    ['normal use case', ['NormalCase'], 'normal-case'],
    ['spaces use case', ['spaces case'], 'spaces-case'],
    ['underscore use case', ['underscore_case'], 'underscore-case'],
    ['capitals and spaces use case', ['Capitals and Spaces'], 'capitals-and-spaces'],
  ];
  tests.forEach(t => {
    const [name, args, want] = t;
    assert.equal(dasherize(...args), want, name);
  });
});

test('test deDasherize function', function(assert) {
  const tests: [string, [string], string][] = [
    ['normal use case', ['normal-case'], 'normal case'],
  ];
  tests.forEach(t => {
    const [name, args, want] = t;
    assert.equal(deDasherize(...args), want, name);
  });
});

test('test camelize function', function(assert) {
  const tests: [string, [string], string][] = [
    ['spaces use case', ['spaces case'], 'spacesCase'],
    ['dashes use case', ['dashes-case'], 'dashesCase'],
    ['underscore use case', ['underscore_case'], 'underscoreCase'],
  ];
  tests.forEach(t => {
    const [name, args, want] = t;
    assert.equal(camelize(...args), want, name);
  });
});

test('test pluralize function', function(assert) {
  const tests: [string, [string], string][] = [
    ['normal use case', ['test'], 'tests'],
  ];
  tests.forEach(t => {
    const [name, args, want] = t;
    assert.equal(pluralize(...args), want, name);
  });
});

test('test regexMatchInGroups function', function(assert) {
  const tests: [string, [string, string], object][] = [
    ['normal use case', ['toronto-on-area', '(?<city>[A-Za-z\\-]+)-(?<provinceCode>on|ab|bc)-area'], { city: 'toronto', provinceCode: 'on' }],
  ];
  tests.forEach(t => {
    const [name, args, want] = t;
    assert.deepEqual(regexMatchInGroups(...args), want, name);
  });
});
