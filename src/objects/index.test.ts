import {
  camelizeKeys, dasherizeKeys, underscoreKeys,
  isObject,
  removeKeys, removeKeysWithBlankValues,
  swapKeysAndValues,
} from '.';

test('expors', () => {
  [
    camelizeKeys, dasherizeKeys, underscoreKeys,
    isObject,
    removeKeys, removeKeysWithBlankValues,
    swapKeysAndValues,
  ].map(item => expect(item).toBeDefined());
});
