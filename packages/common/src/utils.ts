import { omitBy, isUndefined } from "lodash";

export function clean<T extends Record<string, any>>(object: T): T {
    return omitBy(object, a => isUndefined(a)) as T;
}

export function stripQuotationMarks(s: string): string {
    if (!s.trim().startsWith(`"`)) return s;
    return s.trim().slice(1, -1);
}
