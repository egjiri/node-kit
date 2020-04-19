import { test } from 'qunit';
import proxy from './proxy';

test('test proxy function', function(assert) {
  const data = proxy([1, 2, 3], { meta: { totalCount: 3 }})
  assert.deepEqual(data, [1, 2, 3]);
  assert.deepEqual(data.meta, { totalCount: 3 });
});
