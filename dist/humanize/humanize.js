"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../strings/strings");
const numbers_1 = require("../numbers/numbers");
function humanize(value, format) {
    value = value || '';
    if (format) {
        const number = strings_1.toNumber(value);
        if (isNaN(number)) {
            return 'N/A';
        }
        else {
            return numbers_1.formatNumber(number, format);
        }
    }
    else {
        return strings_1.humanize(value);
    }
}
exports.default = humanize;
