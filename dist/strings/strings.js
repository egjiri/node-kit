"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
exports.capitalize = capitalize;
function reverse(str) {
    return str.split('').reverse().join('');
}
exports.reverse = reverse;
function humanize(str) {
    return str.split(/[_-\s]/).map(capitalize).join(' ');
}
exports.humanize = humanize;
function addSeparator(str, separator = ',') {
    return reverse(reverse(str).match(/.{1,3}/g).join(separator));
}
exports.addSeparator = addSeparator;
function toNumber(str) {
    str = str.replace(/[^0-9.]/g, '');
    return parseFloat(str);
}
exports.toNumber = toNumber;
