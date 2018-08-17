import calculatePosition from './calculate-positions';

declare const QUnit;
QUnit.test('test positions calculator', function(assert) {
  const tests: [string, [frame, element, point], position][] = [
    ["on centre", args(50, 50), expected(50, 45, 'right')],
    ["on right edge", args(100, 50), expected(100, 45, 'left')],
    ["close to right edge", args(99, 50), expected(99, 45, 'left')],
    ["far enough from right edge", args(90, 50), expected(90, 45, 'right')],
    ["on left edge", args(0, 50), expected(0, 45, 'right')],
    ["close to left edge", args(1, 50), expected(1, 45, 'right')],
    ["far enough from left edge", args(5, 50), expected(5, 45, 'right')],
    ["on top edge", args(50, 0), expected(45, 0, 'down')],
    ["close to top edge", args(50, 1), expected(45, 1, 'down')],
    ["far enough from top edge", args(50, 5), expected(50, 0, 'right')],
    ["on bottom edge", args(50, 100), expected(45, 100, 'up')],
    ["close to bottom edge", args(50, 99), expected(45, 99, 'up')],
    ["far enough from bottom edge", args(50, 95), expected(50, 90, 'right')],
  ]
  tests.forEach(t => {
    const [name, args, expected] = t;
    const [frame, element, target] = args;
    const got = calculatePosition(frame, element, target);
    assert.deepEqual(got, expected, name);
  });
});

function args(x: number, y: number): [frame, element, point] {
  return [
    { width: 100, height: 100, xShift: 0, yShift: 0 },
    { width: 10, height: 10 },
    { x: x, y: y }
  ]
}

function expected(x, y, direction): position {
  return {
    point: { x: x, y: y },
    direction: direction
  }
}
