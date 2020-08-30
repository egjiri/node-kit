"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swapKeysAndValues = exports.removeKeysWithBlankValues = exports.isObject = exports.dasherizeKeys = exports.camelizeKeys = exports.underscoreKeys = void 0;
const strings_1 = require("../strings/strings");
function underscoreKeys(object) {
    return transformKeys(object, 'underscore');
}
exports.underscoreKeys = underscoreKeys;
function camelizeKeys(object) {
    return transformKeys(object, 'camelize');
}
exports.camelizeKeys = camelizeKeys;
function dasherizeKeys(object) {
    return transformKeys(object, 'dasherize');
}
exports.dasherizeKeys = dasherizeKeys;
function isObject(value) {
    return typeof value === 'object' && !Array.isArray(value) && value !== null && value !== undefined;
}
exports.isObject = isObject;
function removeKeysWithBlankValues(object) {
    const newObject = {};
    Object.keys(object).forEach(key => {
        const value = object[key];
        if (value !== null && value !== undefined) {
            newObject[key] = value;
        }
    });
    return newObject;
}
exports.removeKeysWithBlankValues = removeKeysWithBlankValues;
function swapKeysAndValues(object) {
    const newObject = {};
    Object.keys(object).forEach(key => {
        newObject[object[key]] = key;
    });
    return newObject;
}
exports.swapKeysAndValues = swapKeysAndValues;
function transformKeys(object, transform) {
    const newObject = {};
    Object.keys(object).forEach(key => {
        let value = object[key];
        if (isObject(value)) {
            value = transformKeys(value, transform);
        }
        key = transformKey(key, transform);
        newObject[key] = value;
    });
    return newObject;
}
function transformKey(key, transform) {
    if (transform === 'underscore') {
        return strings_1.underscore(key);
    }
    else if (transform === 'camelize') {
        return strings_1.camelize(key);
    }
    else {
        return strings_1.dasherize(key);
    }
}
