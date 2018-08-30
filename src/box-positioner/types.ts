import Direction from './direction';

export type calculationOptions = {
  frame: rectangle;
  element: rectangle;
  target: point;
  frameOffset: number;
  targetPadding: number;
};

export type point = {
  x: number;
  y: number;
};

export type rectangle = {
  width: number;
  height: number;
};

export type position = {
  point: point;
  direction: Direction;
};

export type nibPosition = {
  top: number,
  left: number,
  transform: 'rotate(0deg)' | 'rotate(90deg)' | 'rotate(180deg)' | 'rotate(270deg)'
}
