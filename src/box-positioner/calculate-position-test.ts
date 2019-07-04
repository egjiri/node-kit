import { test } from 'qunit';
import Direction from './direction';
import calculatePoint from './calculate-point';
import calculatePosition from './calculate-position';
import { calculationOptions, point, position } from './types';

test('test positions calculator', function(assert) {
  const tests: [string, calculationOptions, point, position][] = [
    ['on centre',                                      args( 50,  50),        point( 50,  45),  position( 50,  45)],
    // Edge caes
    ['on right edge',                                  args(100,  50),        point( 90,  45),  position(100,  45, 'left')],
    ['on left edge',                                   args(  0,  50),        point(  0,  45),  position(  0,  45, 'right')],
    ['on top edge',                                    args( 50,   0),        point( 45,   0),  position( 45,   0, 'down')],
    ['on bottom edge',                                 args( 50, 100),        point( 45,  90),  position( 45, 100, 'up')],
    ['close to right edge',                            args( 99,  50),        point( 89,  45),  position( 99,  45, 'left')],
    ['close to left edge',                             args(  1,  50),        point(  1,  45),  position(  1,  45, 'right')],
    ['close to top edge',                              args( 50,   1),        point( 45,   1),  position( 45,   1, 'down')],
    ['close to bottom edge',                           args( 50,  99),        point( 45,  89),  position( 45,  99, 'up')],
    ['far enough from right edge',                     args( 90,  50),        point( 90,  45),  position( 90,  45)],
    ['far enough from left edge',                      args(  5,  50),        point(  5,  45),  position(  5,  45)],
    ['far enough from top edge',                       args( 50,   5),        point( 50,   0),  position( 50,   0)],
    ['far enough from bottom edge',                    args( 50,  95),        point( 50,  90),  position( 50,  90)],
    ['not as close to right edge',                     args( 95,  50),        point( 85,  45),  position( 95,  45, 'left')],
    // Corner cases
    ['on top left edge',                               args(  0,   0),        point(  0,   0),  position(  0,   0, 'down', 'right')],
    ['on top right edge',                              args(100,   0),        point( 90,   0),  position(100,   0, 'down', 'left')],
    ['on bottom right edge',                           args(100, 100),        point( 90,  90),  position(100, 100, 'up', 'left')],
    ['on bottom left edge',                            args(  0, 100),        point(  0,  90),  position(  0, 100, 'up', 'right')],
    ['close to top left edge',                         args(  1,   1),        point(  0,   1),  position(  0,   1, 'down', 'right')],
    ['close to top right edge',                        args( 99,   1),        point( 90,   1),  position(100,   1, 'down', 'left')],
    ['close to bottom right edge',                     args( 99,  99),        point( 90,  89),  position(100,  99, 'up', 'left')],
    ['close to bottom left edge',                      args(  1,  99),        point(  0,  89),  position(  0,  99, 'up', 'right')],
    ['far enough from top left edge',                  args(  5,   5),        point(  5,   0),  position(  5,   0)],
    ['far enough from top right edge',                 args( 90,   5),        point( 90,   0),  position( 90,   0)],
    ['far enough from bottom right edge',              args( 90,  95),        point( 90,  90),  position( 90,  90)],
    ['far enough from bottom left edge',               args(  5,  95),        point(  5,  90),  position(  5,  90)],
    ['on bottom but far enough from right edge',       args( 91, 100),        point( 86,  90),  position( 86, 100, 'up')],
    ['on top but far enough from right edge',          args( 91,   0),        point( 86,   0),  position( 86,   0, 'down')],
    // Offset between frame & element
    ['on centre with offset',                          args( 50,  50, 5),     point( 50,  45),  position( 50,  45)],
    ['on right edge with offset',                      args(100,  50, 5),     point( 85,  45),  position( 95,  45, 'left')],
    ['on left edge with offset',                       args(  0,  50, 5),     point(  5,  45),  position(  5,  45, 'right')],
    ['on top edge with offset',                        args( 50,   0, 5),     point( 45,   5),  position( 45,   5, 'down')],
    ['on bottom edge with offset',                     args( 50, 100, 5),     point( 45,  85),  position( 45,  95, 'up')],
    ['close to right edge with offset',                args( 99,  50, 5),     point( 85,  45),  position( 95,  45, 'left')],
    ['close to left edge with offset',                 args(  1,  50, 5),     point(  5,  45),  position(  5,  45, 'right')],
    ['close to top edge with offset',                  args( 50,   1, 5),     point( 45,   5),  position( 45,   5, 'down')],
    ['close to bottom edge with offset',               args( 50,  99, 5),     point( 45,  85),  position( 45,  95, 'up')],
    ['on right edge offset',                           args( 95,  50, 5),     point( 85,  45),  position( 95,  45, 'left')],
    ['on left edge offset',                            args(  5,  50, 5),     point(  5,  45),  position(  5,  45, 'right')],
    ['on top edge offset',                             args( 50,   5, 5),     point( 45,   5),  position( 45,   5, 'down')],
    ['on bottom edge offset',                          args( 50,  95, 5),     point( 45,  85),  position( 45,  95, 'up')],
    ['far enough from right edge offset',              args( 85,  50, 5),     point( 85,  45),  position( 85,  45)],
    ['far enough from left edge offset',               args( 10,  50, 5),     point( 10,  45),  position( 10,  45)],
    ['far enough from top edge offset',                args( 50,  10, 5),     point( 50,   5),  position( 50,   5)],
    ['far enough from bottom edge offset',             args( 50,  90, 5),     point( 50,  85),  position( 50,  85)],
    // Corner cases with offset between frame & element
    ['on top left edge with offset',                   args(  0,   0, 5),     point(  5,   5),  position(  5,   5, 'down', 'right')],
    ['on top right edge with offset',                  args(100,   0, 5),     point( 85,   5),  position( 95,   5, 'down', 'left')],
    ['on bottom right edge with offset',               args(100, 100, 5),     point( 85,  85),  position( 95,  95, 'up', 'left')],
    ['on bottom left edge with offset',                args(  0, 100, 5),     point(  5,  85),  position(  5,  95, 'up', 'right')],
    ['close to top left edge with offset',             args(  1,   1, 5),     point(  5,   5),  position(  5,   5, 'down', 'right')],
    ['close to top right edge with offset',            args( 99,   1, 5),     point( 85,   5),  position( 95,   5, 'down', 'left')],
    ['close to bottom right edge with offset',         args( 99,  99, 5),     point( 85,  85),  position( 95,  95, 'up', 'left')],
    ['close to bottom left edge with offset',          args(  1,  99, 5),     point(  5,  85),  position(  5,  95, 'up', 'right')],
    ['on top left edge offset',                        args(  5,   5, 5),     point(  5,   5),  position(  5,   5, 'down', 'right')],
    ['on top right edge offset',                       args( 95,   5, 5),     point( 85,   5),  position( 95,   5, 'down', 'left')],
    ['on bottom right edge offset',                    args( 95,  95, 5),     point( 85,  85),  position( 95,  95, 'up', 'left')],
    ['on bottom left edge offset',                     args(  5,  95, 5),     point(  5,  85),  position(  5,  95, 'up', 'right')],
    ['far enough from top left edge offset',           args( 10,  10, 5),     point( 10,   5),  position( 10,   5)],
    ['far enough from top right edge offset',          args( 85,  10, 5),     point( 85,   5),  position( 85,   5)],
    ['far enough from bottom right edge offset',       args( 85,  90, 5),     point( 85,  85),  position( 85,  85)],
    ['far enough from bottom left edge offset',        args( 10,  90, 5),     point( 10,  85),  position( 10,  85)],
    // Target with padding cases
    ['on centre with target padding',                  args( 50,  50, 0, 5),  point( 55,  45),  position( 55,  45)],
    ['on right edge with target padding',              args(100,  50, 0, 5),  point( 85,  45),  position( 95,  45, 'left')],
    ['on left edge with target padding',               args(  0,  50, 0, 5),  point(  5,  45),  position(  5,  45, 'right')],
    ['on top edge with target padding',                args( 50,   0, 0, 5),  point( 45,   5),  position( 45,   5, 'down')],
    ['on bottom edge with target padding',             args( 50, 100, 0, 5),  point( 45,  85),  position( 45,  95, 'up')],
    ['on top left edge with target padding',           args(  0,   0, 0, 5),  point(  5,   5),  position(  5,   5, 'down', 'right')],
    ['on top right edge with target padding',          args(100,   0, 0, 5),  point( 85,   5),  position( 95,   5, 'down', 'left')],
    ['on bottom right edge with target padding',       args(100, 100, 0, 5),  point( 85,  85),  position( 95,  95, 'up', 'left')],
    ['on bottom left edge with target padding',        args(  0, 100, 0, 5),  point(  5,  85),  position(  5,  95, 'up', 'right')],
    ['on centre with offset and target padding',       args( 50,  50, 5, 5),  point( 55,  45),  position( 55,  45)],
    ['on right edge with offset and small padding',    args(100,  50, 5, 2),  point( 85,  45),  position( 95,  45, 'left')],
    ['on left edge with offset and small padding',     args(  0,  50, 5, 2),  point(  5,  45),  position(  5,  45, 'right')],
    ['on top edge with offset and small padding',      args( 50,   0, 5, 2),  point( 45,   5),  position( 45,   5, 'down')],
    ['on bottom edge with offset and small padding',   args( 50, 100, 5, 2),  point( 45,  85),  position( 45,  95, 'up')],
    ['on right edge with offset and large padding',    args(100,  50, 2, 5),  point( 85,  45),  position( 95,  45, 'left')],
    ['on left edge with offset and large padding',     args(  0,  50, 2, 5),  point(  5,  45),  position(  5,  45, 'right')],
    ['on top edge with offset and large padding',      args( 50,   0, 2, 5),  point( 45,   5),  position( 45,   5, 'down')],
    ['on bottom edge with offset and large padding',   args( 50, 100, 2, 5),  point( 45,  85),  position( 45,  95, 'up')],
    // Offset and Padding cases
    ['close to right edge offset with padding',        args( 85,  50, 5, 5),  point( 70,  45),  position( 80,  45, 'left')],
    ['close to right edge offset with small padding',  args( 85,  50, 5, 2),  point( 73,  45),  position( 83,  45, 'left')],
    ['close to right edge offset with large padding',  args( 85,  50, 2, 5),  point( 70,  45),  position( 80,  45, 'left')],
    ['far enough from right edge offset with padding', args( 80,  50, 5, 5),  point( 85,  45),  position( 85,  45)],
  ];
  tests.forEach(t => {
    const [name, calculationOptions, point, position] = t;
    assert.deepEqual(calculatePoint(calculationOptions), point, name);
    assert.deepEqual(calculatePosition(calculationOptions), position, name);
  });
});

function args(x: number, y: number, frameOffset: number = 0, targetPadding: number = 0): calculationOptions {
  return {
    frame: { width: 100, height: 100 },
    element: { width: 10, height: 10 },
    target: { x: x, y: y },
    frameOffset: frameOffset,
    targetPadding: targetPadding
  };
}

function point(x, y): point {
  return { x: x, y: y };
}

function position(x, y, ...directions): position {
  return {
    point: { x: x, y: y },
    direction: new Direction(...directions)
  }
}
