import Direction from './direction';
export declare type calculationOptions = {
    frame: rectangle;
    element: rectangle;
    target: point;
    frameOffset: number;
    targetPadding: number;
};
export declare type point = {
    x: number;
    y: number;
};
export declare type rectangle = {
    width: number;
    height: number;
};
export declare type position = {
    point: point;
    direction: Direction;
};
export declare type nibPosition = {
    top: number;
    left: number;
    transform: 'rotate(0deg)' | 'rotate(90deg)' | 'rotate(180deg)' | 'rotate(270deg)';
};
