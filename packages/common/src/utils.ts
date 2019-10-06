import { omitBy, isUndefined } from "lodash";
import * as moment from "moment";

export function clean<T extends Record<string, any>>(object: T): T {
    return omitBy(object, a => isUndefined(a)) as T;
}

export function stripQuotationMarks(s: string): string {
    if (!s.trim().startsWith(`"`)) return s;
    return s.trim().slice(1, -1);
}

export function isoDate(date: moment.Moment | Date = new Date()): string {
    return moment(date).format("YYYY-MM-DD");
}
