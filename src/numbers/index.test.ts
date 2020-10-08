import {
  formatNumber,
  toArray,
  toString,
} from '.';

test('expors', () => {
  [
    formatNumber,
    toArray,
    toString,
  ].map(item => expect(item).toBeDefined());
});
