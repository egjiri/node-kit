import calculatePosition from './calculate-position';
import { calculationOptions, point } from './types';

export default function calculatePoint(options: calculationOptions): point {
  const { point: { x, y }, direction } = calculatePosition(options);
  const { width, height } = options.element;
  return {
    x: direction.pointsLeft ? x - width : x,
    y: direction.pointsUp ? y - height : y
  };
}
