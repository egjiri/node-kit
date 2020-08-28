export declare type direction = 'right' | 'left' | 'down' | 'up';
export default class Direction {
    private directions;
    constructor(...directions: direction[]);
    add(direction: direction): void;
    get pointsRight(): boolean;
    get pointsLeft(): boolean;
    get pointsDown(): boolean;
    get pointsUp(): boolean;
    get isHorizontal(): boolean;
    get isVertical(): boolean;
    get hasDirection(): boolean;
    get isBlank(): boolean;
}
