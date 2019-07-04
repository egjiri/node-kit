"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const numbers_1 = require("./numbers");
QUnit.test('test formatNumber function', function (assert) {
    const tests = [
        ['percentage use case', [12, 'percentage'], '12%'],
        ['currency use case', [12, 'currency'], '$12'],
        ['large number use case', [1234.56, 'currency'], '$1,234.56'],
    ];
    tests.forEach(t => {
        const [name, args, want] = t;
        const [num, format] = args;
        assert.equal(numbers_1.formatNumber(num, format), want, name);
    });
});
QUnit.test('test toString function', function (assert) {
    const tests = [
        ['simple number', [12], '12'],
        ['large number', [12345], '12,345'],
        ['large number with decimals', [12345.6], '12,345.6'],
        ['number with not defaul number of decimals', [12345.6, 2], '12,345.60'],
        ['number with no decimals', [12345.6, 0], '12,345'],
    ];
    tests.forEach(t => {
        const [name, args, want] = t;
        const [num, numberOfDecimals] = args;
        assert.equal(numbers_1.toString(num, numberOfDecimals), want, name);
    });
});
