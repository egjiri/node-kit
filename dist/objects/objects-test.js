"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qunit_1 = require("qunit");
const objects_1 = require("./objects");
qunit_1.test('test underscoreKeys function', function (assert) {
    const tests = [
        [
            'normal use case',
            [{ 'first key': 1, 'second-key': 2, 'thirdKey': 3, 'fourth_key': 4 }],
            { first_key: 1, second_key: 2, third_key: 3, fourth_key: 4 }
        ],
    ];
    tests.forEach(t => {
        const [name, args, want] = t;
        const [object] = args;
        assert.deepEqual(objects_1.underscoreKeys(object), want, name);
    });
});
qunit_1.test('test camelizeKeys function', function (assert) {
    const tests = [
        [
            'normal use case',
            [{ 'first key': 1, 'second-key': 2, 'thirdKey': 3, 'fourth_key': 4 }],
            { firstKey: 1, secondKey: 2, thirdKey: 3, fourthKey: 4 }
        ],
    ];
    tests.forEach(t => {
        const [name, args, want] = t;
        const [object] = args;
        assert.deepEqual(objects_1.camelizeKeys(object), want, name);
    });
});
qunit_1.test('test dasherizeKeys function', function (assert) {
    const tests = [
        [
            'normal use case',
            [{ 'first key': 1, 'second-key': 2, 'thirdKey': 3, 'fourth_key': 4 }],
            { 'first-key': 1, 'second-key': 2, 'third-key': 3, 'fourth-key': 4 }
        ],
    ];
    tests.forEach(t => {
        const [name, args, want] = t;
        const [object] = args;
        assert.deepEqual(objects_1.dasherizeKeys(object), want, name);
    });
});
qunit_1.test('test isObject function', function (assert) {
    const tests = [
        ['object use case', [{ a: 1 }], true],
        ['null use case', [null], false],
        ['undefined use case', [undefined], false],
        ['string use case', ['a'], false],
        ['number use case', [1], false],
        ['array use case', [['a', 1]], false],
    ];
    tests.forEach(t => {
        const [name, args, want] = t;
        const [object] = args;
        assert.equal(objects_1.isObject(object), want, name);
    });
});
