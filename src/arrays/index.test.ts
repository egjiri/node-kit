import {
  filterDuplicates,
  firstObject, lastObject, nextObject, previousObject,
  isEmpty,
  isStringArray,
} from '.';

test('expors', () => {
  [
    filterDuplicates,
    firstObject, lastObject, nextObject, previousObject,
    isEmpty,
    isStringArray,
  ].map(item => expect(item).toBeDefined());
});
