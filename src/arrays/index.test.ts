import {
  filterDuplicates,
  isEmpty,
  firstObject, lastObject, nextObject, previousObject,
  isStringArray,
} from '.';

test('expors', () => {
  [
    filterDuplicates,
    isEmpty,
    firstObject, lastObject, nextObject, previousObject,
    isStringArray,
  ].map(item => expect(item).toBeDefined());
});
