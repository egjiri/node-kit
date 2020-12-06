import {
  isObject,
  removeKeys, removeKeysWithBlankValues,
  swapKeysAndValues,
  toArray,
  toString,
  camelizeKeys, dasherizeKeys, underscoreKeys,
} from '.';

test('expors', () => {
  [
    isObject,
    removeKeys, removeKeysWithBlankValues,
    swapKeysAndValues,
    toArray,
    toString,
    camelizeKeys, dasherizeKeys, underscoreKeys,
  ].map(item => expect(item).toBeDefined());
});
