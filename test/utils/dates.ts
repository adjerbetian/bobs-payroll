import * as moment from "moment";
import { isoDate } from "../../src";

export const monday = isoDate(moment().startOf("isoWeek"));
export const tuesday = isoDate(moment(monday).add(1, "day"));
export const wednesday = isoDate(moment(monday).add(2, "day"));
export const thursday = isoDate(moment(monday).add(3, "day"));
export const friday = isoDate(moment(monday).add(4, "day"));
export const saturday = isoDate(moment(monday).add(5, "day"));
export const sunday = isoDate(moment(monday).add(6, "day"));

export const lastMonday = isoDate(moment(monday).subtract(1, "week"));
export const lastTuesday = isoDate(moment(tuesday).subtract(1, "week"));
export const lastFriday = isoDate(moment(friday).subtract(1, "week"));

export const never = isoDate(moment(0));
