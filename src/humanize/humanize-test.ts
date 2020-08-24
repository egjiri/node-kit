import { test } from 'qunit';
import humanize from './humanize';
import { format } from '../numbers/numbers';

test('test humanize function', function(assert) {
  const tests: [string, [string?, format?], string][] = [
    ['underscore', ['family_friendly'], 'Family Friendly'],
    ['dashes', ['family-friendly'], 'Family Friendly'],
    ['spaces', ['family friendly'], 'Family Friendly'],
    ['number with percentage format', ['50', 'percentage'], '50%'],
    ['invalid value/format combination', ['text', 'percentage'], 'N/A'],
    ['percentage format with no value', [undefined, 'percentage'], 'N/A'],
    ['number with currency format', ['123.45', 'currency'], '$123.45'],
    ['large number with currency format', ['12345.6', 'currency'], '$12,345.6'],
    ['zero number with currency format', ['0', 'currency'], '$0']
  ];
  tests.forEach(([name, args, want]) => {
    const [value, format] = args;
    assert.equal(humanize(value, format), want, name);
  });
});
