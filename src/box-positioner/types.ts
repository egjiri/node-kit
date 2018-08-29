import Direction from './direction';

export type position = {
  point: point;
  direction: Direction;
};

export type point = {
  x: number;
  y: number;
};

export type frame = {
  width: number;
  height: number;
  padding: number;
};

export type element = {
  width: number;
  height: number;
};

export type target = {
  x: number,
  y: number,
  size: number
}
