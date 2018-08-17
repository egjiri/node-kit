// TODO: Also consider the following:
// 1. frame xShift & yShift
// 2. padding between frame & element
// 3. padding between target & element
// 4. nip position

export default function calculatePosition(frame: frame, element: element, target: point): position {
  return {
    point: calculatePoint(frame, element, target),
    direction: calculateDirection(frame, element, target)
  }
}

function calculatePoint(frame: frame, element: element, target: point): point {
  if (isCloseToTopEdge(element, target) || isCloseToBottomEdge(frame, element, target)) {
    return horizontalCentre(element, target);
  } else {
    return verticalCentre(element, target);
  }
}

function calculateDirection(frame: frame, element: element, target: point): direction {
  if (isCloseToTopEdge(element, target)) {
    return 'down';
  } else if (isCloseToBottomEdge(frame, element, target)) {
    return 'up';
  } else if (isCloseToRightEdge(frame, element, target)) {
    return 'left';
  } else {
    return 'right';
  }
}

function horizontalCentre(element: element, target: point): point {
  return {
    x: target.x - element.width / 2,
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

// function position(p: Position, e: element): point {
//   return {
//     x: p.direction === 'left' ? p.point.x - e.width : p.point.x,
//     y: p.direction === 'up' ? p.point.y - e.height : p.point.y
//   };
// }
