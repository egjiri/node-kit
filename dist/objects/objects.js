"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const underscore = require('underscore.string/underscored');
const camelize = require('underscore.string/camelize');
const dasherize = require('underscore.string/dasherize');
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
        return camelize(key);
    }
    else if (transform === 'dasherize') {
        return dasherize(key);
    }
    else {
        return key;
    }
}
