import calculateNibPosition, { NibTransform } from './calculate-nib-position';
import { calculationOptions, nibPosition } from './types';

describe('test positions calculator', () => {
  const cases: [string, [calculationOptions, number, number], nibPosition][] = [
    /* eslint-disable no-multi-spaces */
    ['on centre',     args(50, 50),     nibPosition(3, -4, 270)],
    /* eslint-enable no-multi-spaces */
  ];
  test.each(cases)('%s', (_, args, expected) => {
    const actual = calculateNibPosition(...args);
    expect(actual).toEqual(expected);
  });
});

export function args(x: number, y: number, frameOffset = 0, targetPadding = 0): [calculationOptions, number, number] {
  return [{
    frame: { width: 100, height: 100 },
    element: { width: 10, height: 10 },
    target: { x: x, y: y },
    frameOffset: frameOffset,
    targetPadding: targetPadding,
  }, 6, 4];
}

function nibPosition(top: number, left: number, deg: 0 | 90 | 180 | 270): nibPosition {
  const transform = `rotate(${deg}deg)` as NibTransform;
  return { top, left, transform };
}
