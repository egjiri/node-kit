"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toString = exports.formatNumber = void 0;
const strings_1 = require("../strings/strings");
function formatNumber(num, format) {
    const value = toString(num);
    if (format === 'percentage') {
        return value + '%';
    }
    else if (format === 'currency') {
        return '$' + value;
    }
    else {
        return value;
    }
}
exports.formatNumber = formatNumber;
function toString(num, numberOfDecimals) {
    const [integral, fractal] = num.toString().split('.');
    let value = strings_1.addSeparator(integral);
    if (fractal) {
        let decimals = fractal.length;
        if (typeof numberOfDecimals === 'number') {
            decimals = numberOfDecimals;
        }
        if (decimals > 0) {
            value += '.' + (fractal + '0000000000').split('', decimals).join('');
        }
    }
    return value;
}
exports.toString = toString;
