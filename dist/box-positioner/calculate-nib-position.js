"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculate_position_1 = require("./calculate-position");
function calculateNibPosition(options, nibWidth, nibHeight) {
    const position = calculate_position_1.default(options);
    const nibHalfWidth = nibWidth / 2;
    const nibHalfHeight = nibHeight / 2;
    const elementWidth = options.element.width;
    const elementHeight = options.element.height;
    const elementHalfWidth = elementWidth / 2 - nibHalfWidth;
    const elementHalfHeight = elementHeight / 2 - nibHalfHeight;
    const { point, direction } = position;
    let leftOffset = options.target.x - (point.x + elementHalfWidth + nibHalfWidth);
    if (direction.pointsLeft) {
        leftOffset += elementWidth;
    }
    if (direction.pointsDown) {
        return {
            top: -nibHeight,
            left: leftOffset + elementHalfWidth,
            transform: 'rotate(0deg)'
        };
    }
    else if (direction.pointsLeft) {
        return {
            top: elementHalfHeight,
            left: elementWidth - 2,
            transform: 'rotate(90deg)'
        };
    }
    else if (direction.pointsUp) {
        return {
            top: elementHeight,
            left: leftOffset + elementHalfWidth,
            transform: 'rotate(180deg)'
        };
    }
    else {
        return {
            top: elementHalfHeight,
            left: -nibWidth + 2,
            transform: 'rotate(270deg)'
        };
    }
}
exports.default = calculateNibPosition;
