import { test } from 'qunit';
import { nextItem, previousItem } from './arrays';

test('test nextItem function', function(assert) {
  const tests: [string, [any[], any], string][] = [
    ['normal use case', [['first', 'second', 'third'], 'second'], 'third'],
    ['item at the end of list', [['first', 'second', 'third'], 'third'], 'first'],
  ];
  tests.forEach(([name, args, want]) => {
    const [array, currentItem] = args;
    assert.equal(nextItem(array, currentItem), want, name);
  });
});

test('test previousItem function', function(assert) {
  const tests: [string, [any[], any], string][] = [
    ['normal use case', [['first', 'second', 'third'], 'second'], 'first'],
    ['item at the beginning of list', [['first', 'second', 'third'], 'first'], 'third'],
  ];
  tests.forEach(([name, args, want]) => {
    const [array, currentItem] = args;
    assert.equal(previousItem(array, currentItem), want, name);
  });
});
