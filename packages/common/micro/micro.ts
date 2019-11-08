import { omitBy, isUndefined } from "lodash";
import * as moment from "moment";

// noinspection NonAsciiCharacters
export const µ = {
    clean<T extends Record<string, any>>(object: T): T {
        return omitBy(object, a => isUndefined(a)) as T;
    },

    stripQuotationMarks(s: string): string {
        if (!s.trim().startsWith(`"`)) return s;
        return s.trim().slice(1, -1);
    },

    isoDate(date: moment.Moment | Date = new Date()): string {
        return moment(date).format("YYYY-MM-DD");
    }
};
