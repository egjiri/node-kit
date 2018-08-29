// TODO: Also consider the following:
// - padding between target & element
// - nib position

export default function calculatePoint(frame: frame, element: element, target: target): point {
  const { point, directions } = calculatePosition(frame, element, target);
  return {
    x: directions.includes('left') ? point.x - element.width : point.x,
    y: directions.includes('up') ? point.y - element.height : point.y
  };
}

export function calculatePosition(frame: frame, element: element, target: target): position {
  return {
    point: approximatePoint(frame, element, target),
    directions: approximateDirection(frame, element, target)
  }
}

function approximatePoint(frame: frame, element: element, target: target): point {
  if (isCloseToTopEdge(frame, element, target) || isCloseToBottomEdge(frame, element, target)) {
    return horizontalCentre(frame, element, target);
  } else {
    return verticalCentre(frame, element, target);
  }
}

function approximateDirection(frame: frame, element: element, target: target): direction[] {
  const directions: direction[] = [];
  if (isCloseToTopEdge(frame, element, target)) {
    directions.push('down');
  } else if (isCloseToBottomEdge(frame, element, target)) {
    directions.push('up');
  }
  if (isCloseToRightEdge(frame, element, target, isHorizontal(directions))) {
    directions.push('left');
  } else if (isCloseToLeftEdge(frame, target, element) || directions.length === 0) {
    directions.push('right');
  }
  return directions;
}

function horizontalCentre(frame: frame, element: element, target: target): point {
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

function verticalCentre(frame: frame, element: element, target: target): point {
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

function isCloseToTopEdge(frame: frame, element: element, target: target): boolean {
  return target.y - element.height / 2 < frame.padding;
}

function isCloseToBottomEdge(frame: frame, element: element, target: target): boolean {
  return target.y + element.height / 2 > frame.height - frame.padding;
}

function isCloseToRightEdge(frame: frame, element: element, target: target, isHorizontal: boolean): boolean {
  const width = isHorizontal ? element.width / 2 : element.width;
  return target.x + width > frame.width - frame.padding;
}

function isCloseToLeftEdge(frame: frame, target: target, element: element): boolean {
  return target.x - element.width / 2 <= frame.padding;
}

function limit(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function isHorizontal(directions: direction[]): boolean {
  return directions.includes('up') || directions.includes('down');
}
