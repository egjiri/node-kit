type frame = {
  width: number;
  height: number;
  padding: number;
};

type element = {
  width: number;
  height: number;
};

type point = {
  x: number;
  y: number;
};

type direction = 'right' | 'left' | 'down' | 'up';

type position = {
  point: point;
  directions: direction[];
};
