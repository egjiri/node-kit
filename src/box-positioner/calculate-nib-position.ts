import calculatePosition from './calculate-position';
import { calculationOptions, nibPosition } from './types';
import Direction from './direction';

export type NibTransform = 'rotate(0deg)' | 'rotate(90deg)' | 'rotate(180deg)' | 'rotate(270deg)'

export default function calculateNibPosition(options: calculationOptions, nibWidth: number, nibHeight: number): nibPosition {
  const position = calculatePosition(options);
  const nibHalfHeight = nibHeight / 2;
  const elementWidth = options.element.width;
  const elementHeight = options.element.height;
  const elementHalfHeight = elementHeight / 2 - nibHalfHeight;
  const { point, direction } = position;
  const left = calculateLeft(direction, options.target.x, point.x, elementWidth, nibWidth);
  if (direction.pointsDown) {
    return buildNibPosition(direction, -nibHeight, left);
  } else if (direction.pointsLeft) {
    return buildNibPosition(direction, elementHalfHeight, elementWidth - 2);
  } else if (direction.pointsUp) {
    return buildNibPosition(direction, elementHeight, left);
  } else {
    return buildNibPosition(direction, elementHalfHeight, - nibWidth + 2);
  }
}

function calculateLeft(direction: Direction, targetX: number, pointX: number, elementWidth: number, nibWidth: number): number | null {
  const nibHalfWidth = nibWidth / 2;
  const elementHalfWidth = elementWidth / 2 - nibHalfWidth;
  let leftOffset = targetX - (pointX + elementHalfWidth + nibHalfWidth);
  if (direction.pointsLeft) {
    leftOffset += elementWidth;
  }
  const left = leftOffset + elementHalfWidth;
  if (left < 0 || left + nibWidth > elementWidth) {
    return null;
  }
  return left;
}

function buildNibPosition(direction: Direction, top: number, left: number | null): nibPosition {
  let transform: NibTransform;
  if (direction.pointsDown) {
    transform = 'rotate(0deg)';
  } else if (direction.pointsLeft) {
    transform = 'rotate(90deg)';
  } else if (direction.pointsUp) {
    transform = 'rotate(180deg)';
  } else {
    transform = 'rotate(270deg)';
  }
  if (left === null) {
    top = 0;
    left = 0;
  }
  return {
    top: top,
    left: left,
    transform: transform,
  };
}
