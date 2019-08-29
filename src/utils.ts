import * as moment from "moment";

export function isoDate(date: moment.Moment | Date = new Date()): string {
    return moment(date).format("YYYY-MM-DD");
}
