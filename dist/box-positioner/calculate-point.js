"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const calculate_position_1 = __importDefault(require("./calculate-position"));
function calculatePoint(options) {
    const { point: { x, y }, direction } = calculate_position_1.default(options);
    const { width, height } = options.element;
    return {
        x: direction.pointsLeft ? x - width : x,
        y: direction.pointsUp ? y - height : y
    };
}
exports.default = calculatePoint;
