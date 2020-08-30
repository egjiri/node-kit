export default function proxy<T extends Record<string, unknown> | Record<string, unknown>[]>(target: T, properties: Record<string, unknown>): T;
