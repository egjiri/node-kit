import {
  formatNumber,
  toString,
} from '.';

test('expors', () => {
  [
    formatNumber,
    toString,
  ].map(item => expect(item).toBeDefined());
});
