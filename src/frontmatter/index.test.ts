import {
  contentIsOnlyFrontmatter,
  extractFrontmatter,
  getFrontmatterArrayProperty,
} from '.';

test('exports', () => {
  [
    contentIsOnlyFrontmatter,
    extractFrontmatter,
    getFrontmatterArrayProperty,
  ].map(item => expect(item).toBeDefined());
});
