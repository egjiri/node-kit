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
    const negativeNumber = str.startsWith('-');
    str = str.replace(/[^0-9.]/g, '');
    if (negativeNumber) {
        str = '-' + str;
    }
    return parseFloat(str);
}
exports.toNumber = toNumber;
function dasherize(str) {
    return str
        .replace(/([A-Z])/g, '-$1')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-/, '')
        .toLowerCase();
}
exports.dasherize = dasherize;
function deDasherize(str) {
    return str.replace('-', ' ');
}
exports.deDasherize = deDasherize;
function camelize(str) {
    return str.split(/[\s-_]/).map((word, index) => index === 0 ? word : capitalize(word)).join('');
}
exports.camelize = camelize;
function pluralize(str) {
    return str.replace(/s$/, '') + 's';
}
exports.pluralize = pluralize;
