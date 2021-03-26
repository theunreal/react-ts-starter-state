export const isObject = <T extends object>(value: any): value is T =>
    typeof value === 'object' && typeof value !== 'function' && value !== undefined;
