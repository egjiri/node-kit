import {
  collapseTilde,
  expandTilde,
  isPathInsideOrEqual,
} from '.';

test('exports path utilities', () => {
  [
    collapseTilde,
    expandTilde,
    isPathInsideOrEqual,
  ].map(item => expect(item).toBeDefined());
});
