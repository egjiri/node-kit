"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.previousItem = exports.nextItem = void 0;
function nextItem(array, currentItem) {
    const index = array.indexOf(currentItem);
    const newIndex = index + 1 < array.length ? index + 1 : 0;
    return array[newIndex];
}
exports.nextItem = nextItem;
function previousItem(array, currentItem) {
    const index = array.indexOf(currentItem);
    const newIndex = index - 1 >= 0 ? index - 1 : array.length - 1;
    return array[newIndex];
}
exports.previousItem = previousItem;
