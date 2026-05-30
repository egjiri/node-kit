import { getFrontmatterArrayProperty } from './get-frontmatter-array-property';
import type { Cases } from 'testing';

const cases: Cases<typeof getFrontmatterArrayProperty> = [
  ['returns undefined when frontmatter is absent', ['Body', 'tags'], undefined],
  ['returns undefined when the property is missing', ['---\ntitle: Note\n---\nBody', 'tags'], undefined],
  ['returns an inline array property', ['---\ntags: [foo, bar]\n---\nBody', 'tags'], ['foo', 'bar']],
  ['returns an empty inline array property', ['---\ntags: []\n---\nBody', 'tags'], []],
  ['returns a block array property', ['---\ntags:\n  - foo\n  - bar\n---\nBody', 'tags'], ['foo', 'bar']],
  ['returns undefined when the property is empty', ['---\ntags:\n---\nBody', 'tags'], undefined],
  ['saves a block array before parsing the next property', ['---\ntags:\n  - foo\n  - bar\ntitle: Note\n---\nBody', 'tags'], ['foo', 'bar']],
  ['ignores blank lines in frontmatter', ['---\n\ntags:\n\n  - foo\n\n  - bar\n\n---\nBody', 'tags'], ['foo', 'bar']],
  [
    'does not strip quotes or comments from inline array values',
    ['---\ntags: ["foo", \'bar\', baz # comment]\n---\nBody', 'tags'],
    ['"foo"', "'bar'", 'baz # comment'],
  ],
];

describe('getFrontmatterArrayProperty', () => {
  test.each(cases)('%s', (_, args, expected) => {
    expect(getFrontmatterArrayProperty(...args)).toEqual(expected);
  });

  test('throws when the property exists as a scalar', () => {
    const actual = () => getFrontmatterArrayProperty('---\ntags: foo\n---\nBody', 'tags');
    expect(actual).toThrow('Property "tags" is not an array');
  });
});
