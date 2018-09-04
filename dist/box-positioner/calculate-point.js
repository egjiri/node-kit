"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculate_position_1 = require("./calculate-position");
function calculatePoint(options) {
    const { point: { x, y }, direction } = calculate_position_1.default(options);
    const { width, height } = options.element;
    return {
        x: direction.pointsLeft ? x - width : x,
        y: direction.pointsUp ? y - height : y
    };
}
exports.default = calculatePoint;
