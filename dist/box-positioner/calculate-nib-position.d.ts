import { calculationOptions, nibPosition } from './types';
export declare type NibTransform = 'rotate(0deg)' | 'rotate(90deg)' | 'rotate(180deg)' | 'rotate(270deg)';
export default function calculateNibPosition(options: calculationOptions, nibWidth: number, nibHeight: number): nibPosition;
