"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qunit_1 = require("qunit");
const humanize_1 = require("./humanize");
qunit_1.test('test humanize function', function (assert) {
    const tests = [
        ['underscore', ['family_friendly'], 'Family Friendly'],
        ['dashes', ['family-friendly'], 'Family Friendly'],
        ['spaces', ['family friendly'], 'Family Friendly'],
        ['number with percentage format', ['50', 'percentage'], '50%'],
        ['invalid value/format combination', ['text', 'percentage'], 'N/A'],
        ['percentage format with no value', [null, 'percentage'], 'N/A'],
        ['number with currency format', ['123.45', 'currency'], '$123.45'],
        ['large number with currency format', ['12345.6', 'currency'], '$12,345.6'],
        ['zero number with currency format', ['0', 'currency'], '$0']
    ];
    tests.forEach(t => {
        const [name, args, want] = t;
        const [value, format] = args;
        assert.equal(humanize_1.default(value, format), want, name);
    });
});
