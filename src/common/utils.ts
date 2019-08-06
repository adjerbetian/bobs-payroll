import * as assert from "assert";
import { isUndefined, isNull } from "lodash";
import * as moment from "moment";

export function stripQuotationMarks(s: string): string {
    if (!s.trim().startsWith(`"`)) return s;
    return s.trim().slice(1, -1);
}

export function assertIsNotEmpty(value?: any | null): void {
    assert(!isNull(value));
    assert(!isUndefined(value));
    assert(!!value || value === 0);
}

export function assertIsISODate(date?: string | null): void {
    assert(moment(date || "", "YYYY-MM-DD", true).isValid());
}

export function assertIsIncludedIn(value: any, array: any[]): void {
    assert(array.includes(value));
}
