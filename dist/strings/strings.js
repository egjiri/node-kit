"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regexMatchInGroups = exports.pluralize = exports.camelize = exports.deDasherize = exports.dasherize = exports.toNumber = exports.addSeparator = exports.humanize = exports.reverse = exports.capitalizeSentences = exports.capitalizeWords = exports.capitalize = exports.underscore = exports.trim = void 0;
function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}
exports.trim = trim;
function underscore(str) {
    return trim(str)
        .replace(/([a-z\d])([A-Z]+)/g, '$1_$2')
        .replace(/[-\s]+/g, '_')
        .toLowerCase();
}
exports.underscore = underscore;
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
exports.capitalize = capitalize;
function capitalizeWords(str) {
    return str.split(' ').map(word => {
        const exceptionWords = ['in', 'on', 'is', 'to', 'for', 'width', 'and', 'on', 'by', 'a', 'at'];
        return exceptionWords.includes(word) ? word.toLowerCase() : capitalize(word);
    }).join(' ');
}
exports.capitalizeWords = capitalizeWords;
function capitalizeSentences(str) {
    return str.split('. ').map(word => capitalize(word)).join('. ');
}
exports.capitalizeSentences = capitalizeSentences;
function reverse(str) {
    return str.split('').reverse().join('');
}
exports.reverse = reverse;
function humanize(str) {
    return str.split(/[_-\s]/).map(capitalize).join(' ');
}
exports.humanize = humanize;
function addSeparator(str, separator = ',') {
    const matches = reverse(str).match(/.{1,3}/g);
    return matches ? reverse(matches.join(separator)) : '';
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
    return str.replace(/-/g, ' ');
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
function regexMatchInGroups(str, regexStr) {
    const groups = {};
    const regex = new RegExp(regexStr.replace(/\?<(.+?)>/g, ''));
    if (regex.test(str)) {
        const matches = str.match(regex);
        const groupMatches = regexStr.match(/\?<(.+?)>/g) || [];
        groupMatches.forEach(group => {
            const name = group.replace(/^\?</, '').replace(/>$/, '');
            const stringPrefix = regexStr.substr(0, regexStr.indexOf(group));
            const index = stringPrefix.replace(/\(\?:/g, '').replace(/[^(]/g, '').length;
            groups[name] = matches[index];
        });
    }
    return groups;
}
exports.regexMatchInGroups = regexMatchInGroups;
