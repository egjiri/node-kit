import Direction from './direction';
import calculatePoint, { calculatePosition } from './calculate-position';
import { frame, element, target, point, position } from './types';

declare const QUnit;
QUnit.test('test positions calculator', function(assert) {
  const tests: [string, [frame, element, target], point, position][] = [
    ["on centre",                                      args( 50,  50),        expt( 50,  45),  exptPos( 50,  45, 'right')],
    // Edge caes
    ["on right edge",                                  args(100,  50),        expt( 90,  45),  exptPos(100,  45, 'left')],
    ["on left edge",                                   args(  0,  50),        expt(  0,  45),  exptPos(  0,  45, 'right')],
    ["on top edge",                                    args( 50,   0),        expt( 45,   0),  exptPos( 45,   0, 'down')],
    ["on bottom edge",                                 args( 50, 100),        expt( 45,  90),  exptPos( 45, 100, 'up')],
    ["close to right edge",                            args( 99,  50),        expt( 89,  45),  exptPos( 99,  45, 'left')],
    ["close to left edge",                             args(  1,  50),        expt(  1,  45),  exptPos(  1,  45, 'right')],
    ["close to top edge",                              args( 50,   1),        expt( 45,   1),  exptPos( 45,   1, 'down')],
    ["close to bottom edge",                           args( 50,  99),        expt( 45,  89),  exptPos( 45,  99, 'up')],
    ["far enough from right edge",                     args( 90,  50),        expt( 90,  45),  exptPos( 90,  45, 'right')],
    ["far enough from left edge",                      args(  5,  50),        expt(  5,  45),  exptPos(  5,  45, 'right')],
    ["far enough from top edge",                       args( 50,   5),        expt( 50,   0),  exptPos( 50,   0, 'right')],
    ["far enough from bottom edge",                    args( 50,  95),        expt( 50,  90),  exptPos( 50,  90, 'right')],
    ["not as close to right edge",                     args( 95,  50),        expt( 85,  45),  exptPos( 95,  45, 'left')],
    // Corner cases
    ["on top left edge",                               args(  0,   0),        expt(  0,   0),  exptPos(  0,   0, 'down', 'right')],
    ["on top right edge",                              args(100,   0),        expt( 90,   0),  exptPos(100,   0, 'down', 'left')],
    ["on bottom right edge",                           args(100, 100),        expt( 90,  90),  exptPos(100, 100, 'up', 'left')],
    ["on bottom left edge",                            args(  0, 100),        expt(  0,  90),  exptPos(  0, 100, 'up', 'right')],
    ["close to top left edge",                         args(  1,   1),        expt(  0,   1),  exptPos(  0,   1, 'down', 'right')],
    ["close to top right edge",                        args( 99,   1),        expt( 90,   1),  exptPos(100,   1, 'down', 'left')],
    ["close to bottom right edge",                     args( 99,  99),        expt( 90,  89),  exptPos(100,  99, 'up', 'left')],
    ["close to bottom left edge",                      args(  1,  99),        expt(  0,  89),  exptPos(  0,  99, 'up', 'right')],
    ["far enough from top left edge",                  args(  0,   5),        expt(  0,   0),  exptPos(  0,   0, 'right')],
    ["far enough from top right edge",                 args( 90,   5),        expt( 90,   0),  exptPos( 90,   0, 'right')],
    ["far enough from bottom right edge",              args( 90,  95),        expt( 90,  90),  exptPos( 90,  90, 'right')],
    ["far enough from bottom left edge",               args(  0,  95),        expt(  0,  90),  exptPos(  0,  90, 'right')],
    ["on bottom but far enough from right edge",       args( 91, 100),        expt( 86,  90),  exptPos( 86, 100, 'up')],
    ["on top but far enough from right edge",          args( 91,   0),        expt( 86,   0),  exptPos( 86,   0, 'down')],
    // Padding between frame & element
    ["on centre with padding",                         args( 50,  50, 5),     expt( 50,  45),  exptPos( 50,  45, 'right')],
    ["on right edge with padding",                     args(100,  50, 5),     expt( 85,  45),  exptPos( 95,  45, 'left')],
    ["on left edge with padding",                      args(  0,  50, 5),     expt(  5,  45),  exptPos(  5,  45, 'right')],
    ["on top edge with padding",                       args( 50,   0, 5),     expt( 45,   5),  exptPos( 45,   5, 'down')],
    ["on bottom edge with padding",                    args( 50, 100, 5),     expt( 45,  85),  exptPos( 45,  95, 'up')],
    ["close to right edge with padding",               args( 99,  50, 5),     expt( 85,  45),  exptPos( 95,  45, 'left')],
    ["close to left edge with padding",                args(  1,  50, 5),     expt(  5,  45),  exptPos(  5,  45, 'right')],
    ["close to top edge with padding",                 args( 50,   1, 5),     expt( 45,   5),  exptPos( 45,   5, 'down')],
    ["close to bottom edge with padding",              args( 50,  99, 5),     expt( 45,  85),  exptPos( 45,  95, 'up')],
    ["on right edge padding",                          args( 95,  50, 5),     expt( 85,  45),  exptPos( 95,  45, 'left')],
    ["on left edge padding",                           args(  5,  50, 5),     expt(  5,  45),  exptPos(  5,  45, 'right')],
    ["on top edge padding",                            args( 50,   5, 5),     expt( 45,   5),  exptPos( 45,   5, 'down')],
    ["on bottom edge padding",                         args( 50,  95, 5),     expt( 45,  85),  exptPos( 45,  95, 'up')],
    ["far enough from right edge padding",             args( 85,  50, 5),     expt( 85,  45),  exptPos( 85,  45, 'right')],
    ["far enough from left edge padding",              args(  5,  50, 5),     expt(  5,  45),  exptPos(  5,  45, 'right')],
    ["far enough from top edge padding",               args( 50,  10, 5),     expt( 50,   5),  exptPos( 50,   5, 'right')],
    ["far enough from bottom edge padding",            args( 50,  90, 5),     expt( 50,  85),  exptPos( 50,  85, 'right')],
    // Corner cases with padding between frame & element
    ["on top left edge with padding",                  args(  0,   0, 5),     expt(  5,   5),  exptPos(  5,   5, 'down', 'right')],
    ["on top right edge with padding",                 args(100,   0, 5),     expt( 85,   5),  exptPos( 95,   5, 'down', 'left')],
    ["on bottom right edge with padding",              args(100, 100, 5),     expt( 85,  85),  exptPos( 95,  95, 'up', 'left')],
    ["on bottom left edge with padding",               args(  0, 100, 5),     expt(  5,  85),  exptPos(  5,  95, 'up', 'right')],
    ["close to top left edge with padding",            args(  1,   1, 5),     expt(  5,   5),  exptPos(  5,   5, 'down', 'right')],
    ["close to top right edge with padding",           args( 99,   1, 5),     expt( 85,   5),  exptPos( 95,   5, 'down', 'left')],
    ["close to bottom right edge with padding",        args( 99,  99, 5),     expt( 85,  85),  exptPos( 95,  95, 'up', 'left')],
    ["close to bottom left edge with padding",         args(  1,  99, 5),     expt(  5,  85),  exptPos(  5,  95, 'up', 'right')],
    ["on top left edge padding",                       args(  5,   5, 5),     expt(  5,   5),  exptPos(  5,   5, 'down', 'right')],
    ["on top right edge padding",                      args( 95,   5, 5),     expt( 85,   5),  exptPos( 95,   5, 'down', 'left')],
    ["on bottom right edge padding",                   args( 95,  95, 5),     expt( 85,  85),  exptPos( 95,  95, 'up', 'left')],
    ["on bottom left edge padding",                    args(  5,  95, 5),     expt(  5,  85),  exptPos(  5,  95, 'up', 'right')],
    ["far enough from top left edge padding",          args(  5,  10, 5),     expt(  5,   5),  exptPos(  5,   5, 'right')],
    ["far enough from top right edge padding",         args( 85,  10, 5),     expt( 85,   5),  exptPos( 85,   5, 'right')],
    ["far enough from bottom right edge padding",      args( 85,  90, 5),     expt( 85,  85),  exptPos( 85,  85, 'right')],
    ["far enough from bottom left edge padding",       args(  5,  90, 5),     expt(  5,  85),  exptPos(  5,  85, 'right')],
  ];
  tests.forEach(t => {
    const [name, args, expected, expectedPosition] = t;
    const [frame, element, target] = args;
    assert.deepEqual(calculatePoint(frame, element, target), expected, name);
    assert.deepEqual(calculatePosition(frame, element, target), expectedPosition, name);
  });
});

function args(x: number, y: number, padding: number = 0, size: number = 0): [frame, element, target] {
  return [
    { width: 100, height: 100, padding: padding },
    { width: 10, height: 10 },
    { x: x, y: y, size: size }
  ]
}

function expt(x, y): point {
  return { x: x, y: y };
}

function exptPos(x, y, ...directions): position {
  return {
    point: { x: x, y: y },
    direction: new Direction(...directions)
  }
}
