import Direction from './direction';
import { calculationOptions, rectangle, point, position } from './types';

export default function calculatePosition(options: calculationOptions): position {
  const { element, targetPadding, frameOffset } = options;

  // reduce the frame size and move the target based on the offset
  const frame = offsetRectangle(options.frame, -frameOffset * 2);
  const target = offsetPoint(options.target, -frameOffset);

  // find an approximate point & direction
  const direction = approximateDirection(frame, element, target, targetPadding);
  const point = approximatePoint(frame, element, target, targetPadding, frameOffset, direction);

  return { point: point, direction: direction }
}

function offsetRectangle(frame: rectangle, offset: number): rectangle {
  return {
    width: frame.width + offset,
    height: frame.height + offset
  };
}

function offsetPoint(point: point, offset: number): point {
  return {
    x: point.x + offset,
    y: point.y + offset
  };
}

function approximateDirection(frame: rectangle, element: rectangle, target: point, targetPadding: number): Direction {
  const direction = new Direction();
  if (isCloseToTopEdge(element, target)) {
    direction.add('down');
  } else if (isCloseToBottomEdge(frame, element, target)) {
    direction.add('up');
  }
  if (isCloseToRightEdge(frame, element, target, targetPadding, direction.isHorizontal)) {
    direction.add('left');
  } else if (isCloseToLeftEdge(element, target)) {
    direction.add('right');
  }
  return direction;
}

function isCloseToTopEdge(element: rectangle, target: point) {
  return target.y - element.height / 2 < 0;
}

function isCloseToBottomEdge(frame: rectangle, element: rectangle, target: point) {
  return target.y + element.height / 2 > frame.height;
}

function isCloseToRightEdge(frame: rectangle, element: rectangle, target: point, targetPadding: number, isHorizontal: boolean) {
  const width = isHorizontal ? element.width / 2 : element.width + targetPadding;
  return target.x + width > frame.width;
}

function isCloseToLeftEdge(element: rectangle, target: point) {
  return target.x - element.width / 2 < 0;
}

function approximatePoint(frame: rectangle, element: rectangle, target: point, targetPadding: number, frameOffset: number, direction: Direction): point {
  let point = centerPoint(frame, element, target, direction);
  point = offsetPoint(point, frameOffset); // revert the frameOffset from the approximate point
  point = offsetPointPadding(point, direction, targetPadding, frameOffset); // apply padding to point

  // TODO: Fix the following hacky scenario
  // adjust for scenario where element falls over the right edge of the frame due to offset and padding
  if (direction.pointsLeft && point.x + element.width === frame.width + frameOffset) {
    point.x -= targetPadding;
  } else if (direction.pointsLeft && point.x + targetPadding + element.width < frame.width + frameOffset) {
    point.x -= frameOffset;
  }

  return point;
}

function centerPoint(frame: rectangle, element: rectangle, target: point, direction: Direction): point {
  if (direction.isHorizontal) {
    return horizontalCentre(frame, element, target);
  } else {
    return verticalCentre(frame, element, target);
  }
}

function horizontalCentre(frame: rectangle, element: rectangle, target: point): point {
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

function verticalCentre(frame: rectangle, element: rectangle, target: point): point {
  const maxX = frame.width;
  const maxY = frame.height - element.height;
  const x = target.x;
  const y = target.y - element.height / 2;
  return {
    x: limit(x, maxX),
    y: limit(y, maxY)
  };
}

function limit(value: number, max: number) {
  return Math.max(0, Math.min(max, value));
}

function offsetPointPadding(point: point, direction: Direction, targetPadding: number, frameOffset: number): point {
  let offset = targetPadding;
  // !: There is a bug where the spacing between the target and the element is inconsistent when
  // !: it is in the center (no direction) or the edges (has direction). Issue likely here!
  if (direction.hasDirection) {
    offset -= frameOffset;
  }
  return offsetPointWithDirection(point, offset, direction);
}

function offsetPointWithDirection(point: point, offset: number, direction: Direction): point {
  if (offset < 0) {
    return point;
  }
  point = Object.assign({}, point);
  if (direction.isBlank || direction.pointsRight) {
    point.x += offset;
  } else if (direction.pointsLeft) {
    point.x -= offset;
  }
  if (direction.pointsDown) {
    point.y += offset;
  } else if (direction.pointsUp) {
    point.y -= offset;
  }
  return point;
}
