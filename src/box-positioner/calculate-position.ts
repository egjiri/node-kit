// TODO: Also consider the following:
// 1. frame xShift & yShift
// 2. padding between frame & element
// 3. padding between target & element
// 4. nib position

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
  if (isCloseToTopEdge(element, target) || isCloseToBottomEdge(frame, element, target)) {
    return horizontalCentre(frame, element, target);
  } else {
    return verticalCentre(element, target);
  }
}

function approximateDirection(frame: frame, element: element, target: point): direction[] {
  const directions: direction[] = [];
  if (isCloseToTopEdge(element, target)) {
    directions.push('down');
  } else if (isCloseToBottomEdge(frame, element, target)) {
    directions.push('up');
  }
  if (isCloseToRightEdge(frame, element, target)) {
    directions.push('left');
  }
  if (isCloseToLeftEdge(target, element) || directions.length === 0) {
    directions.push('right');
  }
  return directions;
}

function horizontalCentre(frame: frame, element: element, target: point): point {
  const x = Math.max(target.x - element.width / 2, 0);
  return {
    x: x + element.width > frame.width ? frame.width : x,
    y: target.y
  };
}

function verticalCentre(element: element, target: point): point {
  return {
    x: target.x,
    y: target.y - element.height / 2
  };
}

function isCloseToTopEdge(element: element, target: point): boolean {
  return target.y - element.height / 2 < 0;
}

function isCloseToBottomEdge(frame: frame, element: element, target: point): boolean {
  return target.y + element.height / 2 > frame.height;
}

function isCloseToRightEdge(frame: frame, element: element, target: point): boolean {
  return target.x + element.width > frame.width;
}

function isCloseToLeftEdge(target: point, element: element): boolean {
  return target.x - element.width /2 <= 0;
}
