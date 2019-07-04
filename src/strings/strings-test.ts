import { test } from 'qunit';
import { capitalize, reverse, humanize, addSeparator, toNumber } from './strings';

test('test capitalize function', function(assert) {
  const tests: [string, [string], string][] = [
    ['single word capitalizes the first character', ['word'], 'Word'],
    ['multiple words only capitalize the first', ['two words'], 'Two words'],
    ['starting with a number does not chang the string', ['1password'], '1password']
  ];
  tests.forEach(t => {
    const [name, args, want] = t;
    const [str] = args;
    assert.equal(capitalize(str), want, name);
  });
});

test('test reverse function', function(assert) {
  const tests: [string, [string], string][] = [
    ['normal use case', ['word'], 'drow']
  ];
  tests.forEach(t => {
    const [name, args, want] = t;
    const [str] = args;
    assert.equal(reverse(str), want, name);
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
    const [str] = args;
    assert.equal(humanize(str), want, name);
  });
});

test('test addSeparator function', function(assert) {
  const tests: [string, [string, string?], string][] = [
    ['normal use case', ['1234567890'], '1,234,567,890'],
    ['diffent separtor use case', ['1234567890', '-'], '1-234-567-890']
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
  ];
  tests.forEach(t => {
    const [name, args, want] = t;
    const [str] = args;
    assert.equal(toNumber(str), want, name);
  });
});
