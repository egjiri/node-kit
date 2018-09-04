"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Direction {
    constructor(...directions) {
        this.directions = directions;
    }
    add(direction) {
        this.directions.push(direction);
    }
    get pointsRight() { return this.directions.includes('right'); }
    get pointsLeft() { return this.directions.includes('left'); }
    get pointsDown() { return this.directions.includes('down'); }
    get pointsUp() { return this.directions.includes('up'); }
    get isHorizontal() { return this.pointsUp || this.pointsDown; }
    get isVertical() { return this.pointsLeft || this.pointsRight; }
    get hasDirection() { return this.directions.length > 0; }
    get isBlank() { return !this.hasDirection; }
}
exports.default = Direction;
