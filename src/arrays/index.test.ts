import {
  filterDuplicates,
  firstObject,
  isEmpty,
  isStringArray,
  lastObject,
  nextObject,
  previousObject,
} from '.';

test('expors', () => {
  [
    filterDuplicates,
    firstObject, lastObject, nextObject, previousObject,
    isEmpty,
    isStringArray,
  ].map(item => expect(item).toBeDefined());
});
