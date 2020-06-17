"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const underscore = require("underscore.string/underscored");
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
    object = { ...object };
    const nullValues = [null, undefined];
    Object.keys(object).forEach(key => nullValues.includes(object[key]) && delete object[key]);
    return object;
}
exports.removeKeysWithBlankValues = removeKeysWithBlankValues;
function transformKeys(object, transform) {
    object = Object.assign({}, object);
    for (let key in object) {
        // only manipulate property not from the prototype
        if (object.hasOwnProperty(key)) {
            let value = object[key];
            if (isObject(value)) {
                value = transformKeys(value, transform);
            }
            delete object[key];
            key = transformKey(key, transform);
            object[key] = value;
        }
    }
    return object;
}
function transformKey(key, transform) {
    if (transform === 'underscore') {
        return underscore(key);
    }
    else if (transform === 'camelize') {
        return strings_1.camelize(key);
    }
    else if (transform === 'dasherize') {
        return strings_1.dasherize(key);
    }
    else {
        return key;
    }
}
