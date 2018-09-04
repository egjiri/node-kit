"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const direction_1 = require("./direction");
function calculatePosition(options) {
    const { element, targetPadding, frameOffset } = options;
    // reduce the frame size and move the target based on the offset
    const frame = offsetRectange(options.frame, -frameOffset * 2);
    const target = offsetPoint(options.target, -frameOffset);
    // find an approximate point & direction
    const direction = approximateDirection(frame, element, target, targetPadding);
    const point = approximatePoint(frame, element, target, targetPadding, frameOffset, direction);
    return { point: point, direction: direction };
}
exports.default = calculatePosition;
function offsetRectange(frame, offset) {
    return {
        width: frame.width + offset,
        height: frame.height + offset
    };
}
function offsetPoint(point, offset) {
    return {
        x: point.x + offset,
        y: point.y + offset
    };
}
function approximateDirection(frame, element, target, targetPadding) {
    const direction = new direction_1.default();
    if (isCloseToTopEdge(element, target)) {
        direction.add('down');
    }
    else if (isCloseToBottomEdge(frame, element, target)) {
        direction.add('up');
    }
    if (isCloseToRightEdge(frame, element, target, targetPadding, direction.isHorizontal)) {
        direction.add('left');
    }
    else if (isCloseToLeftEdge(element, target)) {
        direction.add('right');
    }
    return direction;
}
function isCloseToTopEdge(element, target) {
    return target.y - element.height / 2 < 0;
}
function isCloseToBottomEdge(frame, element, target) {
    return target.y + element.height / 2 > frame.height;
}
function isCloseToRightEdge(frame, element, target, targetPadding, isHorizontal) {
    const width = isHorizontal ? element.width / 2 : element.width + targetPadding;
    return target.x + width > frame.width;
}
function isCloseToLeftEdge(element, target) {
    return target.x - element.width / 2 < 0;
}
function approximatePoint(frame, element, target, targetPadding, frameOffset, direction) {
    let point = centerPoint(frame, element, target, direction);
    point = offsetPoint(point, frameOffset); // revert the frameOffset from the approximate point
    point = offsetPointPadding(point, direction, targetPadding, frameOffset); // apply padding to point
    // TODO: Fix the following hacky scenario
    // adjust for scenario where element falls over the right edge of the frame due to offset and padding
    if (direction.pointsLeft && point.x + element.width === frame.width + frameOffset) {
        point.x -= targetPadding;
    }
    else if (direction.pointsLeft && point.x + targetPadding + element.width < frame.width + frameOffset) {
        point.x -= frameOffset;
    }
    return point;
}
function centerPoint(frame, element, target, direction) {
    if (direction.isHorizontal) {
        return horizontalCentre(frame, element, target);
    }
    else {
        return verticalCentre(frame, element, target);
    }
}
function horizontalCentre(frame, element, target) {
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
function verticalCentre(frame, element, target) {
    const maxX = frame.width;
    const maxY = frame.height - element.height;
    const x = target.x;
    const y = target.y - element.height / 2;
    return {
        x: limit(x, maxX),
        y: limit(y, maxY)
    };
}
function limit(value, max) {
    return Math.max(0, Math.min(max, value));
}
function offsetPointPadding(point, direction, targetPadding, frameOffset) {
    let offset = targetPadding;
    if (direction.hasDirection) {
        offset -= frameOffset;
    }
    return offsetPointWithDirection(point, offset, direction);
}
function offsetPointWithDirection(point, offset, direction) {
    if (offset < 0) {
        return point;
    }
    point = Object.assign({}, point);
    if (direction.isBlank || direction.pointsRight) {
        point.x += offset;
    }
    else if (direction.pointsLeft) {
        point.x -= offset;
    }
    if (direction.pointsDown) {
        point.y += offset;
    }
    else if (direction.pointsUp) {
        point.y -= offset;
    }
    return point;
}
