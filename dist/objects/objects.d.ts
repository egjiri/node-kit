declare type objectWithStringKeys = {
    [key: string]: any;
};
declare type objectWithStringKeysAndValues = {
    [key: string]: string;
};
export declare function underscoreKeys(object: objectWithStringKeys): objectWithStringKeys;
export declare function camelizeKeys(object: objectWithStringKeys): objectWithStringKeys;
export declare function dasherizeKeys(object: objectWithStringKeys): objectWithStringKeys;
export declare function isObject(value: any): boolean;
export declare function removeKeysWithBlankValues(object: objectWithStringKeys): objectWithStringKeys;
export declare function swapKeysAndValues(object: objectWithStringKeysAndValues): objectWithStringKeysAndValues;
export {};
