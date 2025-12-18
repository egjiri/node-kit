import {
  humanize,
} from '.';

test('exports', () => {
  [
    humanize,
  ].map(item => expect(item).toBeDefined());
});
