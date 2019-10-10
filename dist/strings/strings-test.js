"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qunit_1 = require("qunit");
const strings_1 = require("./strings");
qunit_1.test('test capitalize function', function (assert) {
    const tests = [
        ['single word capitalizes the first character', ['word'], 'Word'],
        ['multiple words only capitalize the first', ['two words'], 'Two words'],
        ['starting with a number does not chang the string', ['1password'], '1password']
    ];
    tests.forEach(t => {
        const [name, args, want] = t;
        const [str] = args;
        assert.equal(strings_1.capitalize(str), want, name);
    });
});
qunit_1.test('test reverse function', function (assert) {
    const tests = [
        ['normal use case', ['word'], 'drow']
    ];
    tests.forEach(t => {
        const [name, args, want] = t;
        const [str] = args;
        assert.equal(strings_1.reverse(str), want, name);
    });
});
qunit_1.test('test humanize function', function (assert) {
    const tests = [
        ['underscore use case', ['example_string'], 'Example String'],
        ['dashes use case', ['example-string'], 'Example String'],
        ['spaces use case', ['example string'], 'Example String'],
    ];
    tests.forEach(t => {
        const [name, args, want] = t;
        const [str] = args;
        assert.equal(strings_1.humanize(str), want, name);
    });
});
qunit_1.test('test addSeparator function', function (assert) {
    const tests = [
        ['normal use case', ['1234567890'], '1,234,567,890'],
        ['diffent separtor use case', ['1234567890', '-'], '1-234-567-890']
    ];
    tests.forEach(t => {
        const [name, args, want] = t;
        const [str, separator] = args;
        assert.equal(strings_1.addSeparator(str, separator), want, name);
    });
});
qunit_1.test('test toNumber function', function (assert) {
    const tests = [
        ['normal use case', ['123'], 123],
        ['number with decimals', ['123.45'], 123.45],
        ['invalid characters gets stripped out', ['a1b2c3.d4e5'], 123.45],
        ['negative number', ['-123'], -123],
        ['negative charactred not at the start', ['-12-3'], -123],
    ];
    tests.forEach(t => {
        const [name, args, want] = t;
        const [str] = args;
        assert.equal(strings_1.toNumber(str), want, name);
    });
});
