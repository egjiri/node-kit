import {
  isEmpty,
  firstObject, lastObject, nextObject, previousObject,
} from '.';

test('expors', () => {
  [
    isEmpty,
    firstObject, lastObject, nextObject, previousObject,
  ].map(item => expect(item).toBeDefined());
});
