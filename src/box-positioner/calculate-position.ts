// TODO: Also consider the following:
// - padding between target & element
// - nib position

export default function calculatePoint(frame: frame, element: element, target: point): point {
  const { point, directions } = calculatePosition(frame, element, target);
  return {
    x: directions.includes('left') ? point.x - element.width : point.x,
    y: directions.includes('up') ? point.y - element.height : point.y
  };
}

export function calculatePosition(frame: frame, element: element, target: point): position {
  return {
    point: approximatePoint(frame, element, target),
    directions: approximateDirection(frame, element, target)
  }
}

function approximatePoint(frame: frame, element: element, target: point): point {
  if (isCloseToTopEdge(frame, element, target) || isCloseToBottomEdge(frame, element, target)) {
    return horizontalCentre(frame, element, target);
  } else {
    return verticalCentre(frame, element, target);
  }
}

function approximateDirection(frame: frame, element: element, target: point): direction[] {
  const directions: direction[] = [];
  if (isCloseToTopEdge(frame, element, target)) {
    directions.push('down');
  } else if (isCloseToBottomEdge(frame, element, target)) {
    directions.push('up');
  }
  if (isCloseToRightEdge(frame, element, target)) {
    directions.push('left');
  }
  if (isCloseToLeftEdge(frame, target, element) || directions.length === 0) {
    directions.push('right');
  }
  return directions;
}

function horizontalCentre(frame: frame, element: element, target: point): point {
  const min = frame.padding;
  const maxX = frame.width - frame.padding;
  const maxY = frame.height - frame.padding;
  const halfWith = element.width / 2;
  const x = target.x + halfWith > maxX ? maxX : target.x - halfWith;
  const y = target.y;
  return {
    x: limit(x, min, maxX),
    y: limit(y, min, maxY)
  };
}

function verticalCentre(frame: frame, element: element, target: point): point {
  const min = frame.padding;
  const maxX = frame.width - frame.padding;
  const maxY = frame.height - frame.padding - element.height;
  const x = target.x;
  const y = target.y - element.height / 2;
  return {
    x: limit(x, min, maxX),
    y: limit(y, min, maxY)
  };
}

function isCloseToTopEdge(frame: frame, element: element, target: point): boolean {
  return target.y - element.height / 2 < frame.padding;
}

function isCloseToBottomEdge(frame: frame, element: element, target: point): boolean {
  return target.y + element.height / 2 > frame.height - frame.padding;
}

function isCloseToRightEdge(frame: frame, element: element, target: point): boolean {
  return target.x + element.width > frame.width - frame.padding;
}

function isCloseToLeftEdge(frame: frame, target: point, element: element): boolean {
  return target.x - element.width / 2 <= frame.padding;
}

function limit(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
