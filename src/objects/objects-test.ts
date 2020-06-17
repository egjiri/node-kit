import { test } from 'qunit';
import { underscoreKeys, camelizeKeys, dasherizeKeys, isObject, removeKeysWithBlankValues } from './objects';

test('test underscoreKeys function', function(assert) {
  const tests: [string, [object], object][] = [
    [
      'normal use case',
      [{ 'first key': 1, 'second-key': 2, 'thirdKey': 3, 'fourth_key': 4 }],
      { first_key: 1, second_key: 2, third_key: 3, fourth_key: 4 }
    ],
  ];
  tests.forEach(t => {
    const [name, args, want] = t;
    const [object] = args;
    assert.deepEqual(underscoreKeys(object), want, name);
  });
});

test('test camelizeKeys function', function(assert) {
  const tests: [string, [object], object][] = [
    [
      'normal use case',
      [{ 'first key': 1, 'second-key': 2, 'thirdKey': 3, 'fourth_key': 4 }],
      { firstKey: 1, secondKey: 2, thirdKey: 3, fourthKey: 4 }
    ],
  ];
  tests.forEach(t => {
    const [name, args, want] = t;
    const [object] = args;
    assert.deepEqual(camelizeKeys(object), want, name);
  });
});

test('test dasherizeKeys function', function(assert) {
  const tests: [string, [object], object][] = [
    [
      'normal use case',
      [{ 'first key': 1, 'second-key': 2, 'thirdKey': 3, 'fourth_key': 4 }],
      { 'first-key': 1, 'second-key': 2, 'third-key': 3, 'fourth-key': 4 }
    ],
  ];
  tests.forEach(t => {
    const [name, args, want] = t;
    const [object] = args;
    assert.deepEqual(dasherizeKeys(object), want, name);
  });
});

test('test isObject function', function(assert) {
  const tests: [string, [any], boolean][] = [
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
    assert.equal(isObject(object), want, name);
  });
});

test('test removeKeysWithBlankValues function', function(assert) {
  const tests: [string, [any], object][] = [
    ['normal use case', [{ a: 1, b: 2 }], { a: 1, b: 2 }],
    ['null use case', [{ a: 1, b: null }], { a: 1 }],
    ['undefined use case', [{ a: 1, b: undefined }], { a: 1 }],
  ];
  tests.forEach(t => {
    const [name, args, want] = t;
    const [object] = args;
    assert.deepEqual(removeKeysWithBlankValues(object), want, name);
  });
});
