"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qunit_1 = require("qunit");
const arrays_1 = require("./arrays");
qunit_1.test('test nextItem function', function (assert) {
    const tests = [
        ['normal use case', [['first', 'second', 'third'], 'second'], 'third'],
        ['item at the end of list', [['first', 'second', 'third'], 'third'], 'first'],
    ];
    tests.forEach(t => {
        const [name, args, want] = t;
        const [array, currentItem] = args;
        assert.equal(arrays_1.nextItem(array, currentItem), want, name);
    });
});
qunit_1.test('test previousItem function', function (assert) {
    const tests = [
        ['normal use case', [['first', 'second', 'third'], 'second'], 'first'],
        ['item at the beginning of list', [['first', 'second', 'third'], 'first'], 'third'],
    ];
    tests.forEach(t => {
        const [name, args, want] = t;
        const [array, currentItem] = args;
        assert.equal(arrays_1.previousItem(array, currentItem), want, name);
    });
});
