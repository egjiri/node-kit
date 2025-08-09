export type Cases<T extends (...args: any) => any> = [string, Parameters<T>, ReturnType<T>][]; // eslint-disable-line @typescript-eslint/no-explicit-any
