declare type direction = 'right' | 'left' | 'down' | 'up';
export default class Direction {
    private directions;
    constructor(...directions: direction[]);
    add(direction: direction): void;
    readonly pointsRight: boolean;
    readonly pointsLeft: boolean;
    readonly pointsDown: boolean;
    readonly pointsUp: boolean;
    readonly isHorizontal: boolean;
    readonly isVertical: boolean;
    readonly hasDirection: boolean;
    readonly isBlank: boolean;
}
export {};
