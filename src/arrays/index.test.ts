import {
  isEmpty,
  firstObject, lastObject, nextObject, previousObject,
  isStringArray,
} from '.';

test('expors', () => {
  [
    isEmpty,
    firstObject, lastObject, nextObject, previousObject,
    isStringArray,
  ].map(item => expect(item).toBeDefined());
});
