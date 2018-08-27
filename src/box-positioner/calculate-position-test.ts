import calculatePoint, { calculatePosition } from './calculate-position';

declare const QUnit;
QUnit.test('test positions calculator', function(assert) {
  const tests: [string, [frame, element, point], point, position][] = [
    ["on centre",                         args( 50,  50),  expected( 50,  45),  expectedPosition( 50,  45, ['right'])],
    ["on right edge",                     args(100,  50),  expected( 90,  45),  expectedPosition(100,  45, ['left'])],
    ["on left edge",                      args(  0,  50),  expected(  0,  45),  expectedPosition(  0,  45, ['right'])],
    ["on top edge",                       args( 50,   0),  expected( 45,   0),  expectedPosition( 45,   0, ['down'])],
    ["on bottom edge",                    args( 50, 100),  expected( 45,  90),  expectedPosition( 45, 100, ['up'])],
    ["on top left edge",                  args(  0,   0),  expected(  0,   0),  expectedPosition(  0,   0, ['down', 'right'])],
    ["on top right edge",                 args(100,   0),  expected( 90,   0),  expectedPosition(100,   0, ['down', 'left'])],
    ["on bottom right edge",              args(100, 100),  expected( 90,  90),  expectedPosition(100, 100, ['up', 'left'])],
    ["on bottom left edge",               args(  0, 100),  expected(  0,  90),  expectedPosition(  0, 100, ['up', 'right'])],
    ["close to right edge",               args( 99,  50),  expected( 89,  45),  expectedPosition( 99,  45, ['left'])],
    ["close to left edge",                args(  1,  50),  expected(  1,  45),  expectedPosition(  1,  45, ['right'])],
    ["close to top edge",                 args( 50,   1),  expected( 45,   1),  expectedPosition( 45,   1, ['down'])],
    ["close to bottom edge",              args( 50,  99),  expected( 45,  89),  expectedPosition( 45,  99, ['up'])],
    ["close to top left edge",            args(  1,   1),  expected(  0,   1),  expectedPosition(  0,   1, ['down', 'right'])],
    ["close to top right edge",           args( 99,   1),  expected( 90,   1),  expectedPosition(100,   1, ['down', 'left'])],
    ["close to bottom right edge",        args( 99,  99),  expected( 90,  89),  expectedPosition(100,  99, ['up', 'left'])],
    ["close to bottom left edge",         args(  1,  99),  expected(  0,  89),  expectedPosition(  0,  99, ['up', 'right'])],
    ["far enough from right edge",        args( 90,  50),  expected( 90,  45),  expectedPosition( 90,  45, ['right'])],
    ["far enough from left edge",         args(  5,  50),  expected(  5,  45),  expectedPosition(  5,  45, ['right'])],
    ["far enough from top edge",          args( 50,   5),  expected( 50,   0),  expectedPosition( 50,   0, ['right'])],
    ["far enough from bottom edge",       args( 50,  95),  expected( 50,  90),  expectedPosition( 50,  90, ['right'])],
    ["far enough from top left edge",     args(  0,   5),  expected(  0,   0),  expectedPosition(  0,   0, ['right'])],
    ["far enough from top right edge",    args( 90,   5),  expected( 90,   0),  expectedPosition( 90,   0, ['right'])],
    ["far enough from bottom right edge", args( 90,  95),  expected( 90,  90),  expectedPosition( 90,  90, ['right'])],
    ["far enough from bottom left edge",  args(  0,  95),  expected(  0,  90),  expectedPosition(  0,  90, ['right'])],
  ]
  tests.forEach(t => {
    const [name, args, expected, expectedPosition] = t;
    const [frame, element, target] = args;
    assert.deepEqual(calculatePoint(frame, element, target), expected, name);
    assert.deepEqual(calculatePosition(frame, element, target), expectedPosition, name);
  });
});

function args(x: number, y: number): [frame, element, point] {
  return [
    { width: 100, height: 100, xShift: 0, yShift: 0 },
    { width: 10, height: 10 },
    { x: x, y: y }
  ]
}

function expected(x, y): point {
  return { x: x, y: y };
}

function expectedPosition(x, y, direction): position {
  return {
    point: { x: x, y: y },
    directions: direction
  }
}
