import Direction from './direction';
import { rect, point, position } from './types';

export type calculationOptions = {
  frame: rect,
  element: rect,
  target: point,
  frameOffset: number,
  targetPadding: number
}

export default function calculatePoint(options: calculationOptions): point {
  const { point: { x, y }, direction } = calculatePosition(options);
  const { width, height } = options.element;
  return {
    x: direction.pointsLeft ? x - width : x,
    y: direction.pointsUp ? y - height : y
  };
}

export function calculatePosition(options: calculationOptions): position {
  const { element, frameOffset } = options;

  // decrease the frame and move the target based on the offset
  const frame = offsetFrame(options.frame, -frameOffset * 2);
  const target = offsetPoint(options.target, -frameOffset);

  // find an approximate point & direction
  const direction = approximateDirection(frame, element, target);
  let point = approximatePoint(frame, element, target);

  // revert the frameOffset from the approximate point
  point = offsetPoint(point, frameOffset);

  return {
    point: point,
    direction: direction
  }
}

function approximatePoint(frame: rect, element: rect, target: point): point {
  if (isCloseToTopEdge(frame, element, target) || isCloseToBottomEdge(frame, element, target)) {
    return horizontalCentre(frame, element, target);
  } else {
    return verticalCentre(frame, element, target);
  }
}

function approximateDirection(frame: rect, element: rect, target: point): Direction {
  const direction = new Direction();
  if (isCloseToTopEdge(frame, element, target)) {
    direction.add('down');
  } else if (isCloseToBottomEdge(frame, element, target)) {
    direction.add('up');
  }
  if (isCloseToRightEdge(frame, element, target, direction.isHorizontal)) {
    direction.add('left');
  } else if (isCloseToLeftEdge(frame, target, element) || direction.isNone) {
    direction.add('right');
  }
  return direction;
}

function horizontalCentre(frame: rect, element: rect, target: point): point {
  const maxX = frame.width;
  const maxY = frame.height;
  const halfWith = element.width / 2;
  const x = target.x + halfWith > maxX ? maxX : target.x - halfWith;
  const y = target.y;
  return {
    x: limit(x, maxX),
    y: limit(y, maxY)
  };
}

function verticalCentre(frame: rect, element: rect, target: point): point {
  const maxX = frame.width;
  const maxY = frame.height - element.height;
  const x = target.x;
  const y = target.y - element.height / 2;
  return {
    x: limit(x, maxX),
    y: limit(y, maxY)
  };
}

function isCloseToTopEdge(frame: rect, element: rect, target: point) {
  return target.y - element.height / 2 < 0;
}

function isCloseToLeftEdge(frame: rect, target: point, element: rect) {
  return target.x - element.width / 2 < 0;
}

function isCloseToBottomEdge(frame: rect, element: rect, target: point) {
  return target.y + element.height / 2 > frame.height;
}

function isCloseToRightEdge(frame: rect, element: rect, target: point, isHorizontal: boolean) {
  const width = isHorizontal ? element.width / 2 : element.width;
  return target.x + width > frame.width;
}

function limit(value: number, max: number) {
  return Math.max(0, Math.min(max, value));
}

function offsetFrame(frame: rect, offset: number): rect {
  return {
    width: frame.width + offset,
    height: frame.height + offset
  };
}

function offsetPoint(point: point, offset: number): point {
  return {
    x: point.x + offset,
    y: point.y + offset
  }
}
