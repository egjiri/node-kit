import Direction from './direction';

export type position = {
  point: point;
  direction: Direction;
};

export type point = {
  x: number;
  y: number;
};

export type rect = {
  width: number;
  height: number;
};
