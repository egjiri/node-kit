import {
  addValueToFrontmatterArray,
  contentIsOnlyFrontmatter,
  extractFrontmatter,
  getFrontmatterArrayProperty,
} from '.';

test('exports', () => {
  [
    addValueToFrontmatterArray,
    contentIsOnlyFrontmatter,
    extractFrontmatter,
    getFrontmatterArrayProperty,
  ].map(item => expect(item).toBeDefined());
});
