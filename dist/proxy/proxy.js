"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
function proxy(target, properties) {
    return new Proxy(target, {
        get: (target, prop) => {
            if (prop in target) {
                return getOwnProperties(prop, target);
            }
            else {
                return getCustomProperties(prop, properties);
            }
        },
    });
}
exports.default = proxy;
function getOwnProperties(property, target) {
    if (util_1.isArray(target)) {
        return target[property];
    }
    else {
        return target[property];
    }
}
function getCustomProperties(property, properties) {
    for (const key in properties) {
        if (property === key && Object.prototype.hasOwnProperty.call(properties, key)) {
            return properties[key];
        }
    }
}
