export declare function trim(str: string): string;
export declare function underscore(str: string): string;
export declare function capitalize(str: string): string;
export declare function capitalizeWords(str: string): string;
export declare function capitalizeSentences(str: string): string;
export declare function reverse(str: string): string;
export declare function humanize(str: string): string;
export declare function addSeparator(str: string, separator?: string): string;
export declare function toNumber(str: string): number;
export declare function dasherize(str: string): string;
export declare function deDasherize(str: string): string;
export declare function camelize(str: string): string;
export declare function pluralize(str: string): string;
declare type matchGroup = {
    [key: string]: string;
};
export declare function regexMatchInGroups(str: string, regexStr: string): matchGroup;
export {};
