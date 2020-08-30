import Direction, { direction } from './direction';

describe('direction', () => {
  describe('isVertical', () => {
    const cases: [string, [direction], boolean][] = [
      ['right use case', ['right'], true],
      ['left use case', ['left'], true],
      ['down use case', ['down'], false],
      ['up use case', ['up'], false],
    ];
    test.each(cases)('%s', (_, args, expected) => {
      const actual = new Direction(...args).isVertical;
      expect(actual).toEqual(expected);
    });
  });
});
