"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculate_position_1 = require("./calculate-position");
function calculateNibPosition(options, nibWidth, nibHeight) {
    const position = calculate_position_1.default(options);
    const nibHalfHeight = nibHeight / 2;
    const elementWidth = options.element.width;
    const elementHeight = options.element.height;
    const elementHalfHeight = elementHeight / 2 - nibHalfHeight;
    const { point, direction } = position;
    const left = calculateLeft(direction, options.target.x, point.x, elementWidth, nibWidth);
    if (direction.pointsDown) {
        return buildNibPosition(direction, -nibHeight, left);
    }
    else if (direction.pointsLeft) {
        return buildNibPosition(direction, elementHalfHeight, elementWidth - 2);
    }
    else if (direction.pointsUp) {
        return buildNibPosition(direction, elementHeight, left);
    }
    else {
        return buildNibPosition(direction, elementHalfHeight, -nibWidth + 2);
    }
}
exports.default = calculateNibPosition;
function calculateLeft(direction, targetX, pointX, elementWidth, nibWidth) {
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
function buildNibPosition(direction, top, left) {
    let transform;
    if (direction.pointsDown) {
        transform = 'rotate(0deg)';
    }
    else if (direction.pointsLeft) {
        transform = 'rotate(90deg)';
    }
    else if (direction.pointsUp) {
        transform = 'rotate(180deg)';
    }
    else {
        transform = 'rotate(270deg)';
    }
    if (left === null) {
        top = 0;
        left = 0;
    }
    return {
        top: top,
        left: left,
        transform: transform
    };
}