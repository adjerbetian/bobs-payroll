import * as moment from "moment";
import { isoDate } from "../../utils";

export const monday = isoDate(moment().startOf("isoWeek"));
export const tuesday = isoDate(moment(monday).add(1, "day"));
export const wednesday = isoDate(moment(monday).add(2, "day"));
export const thursday = isoDate(moment(monday).add(3, "day"));
export const friday = isoDate(moment(monday).add(4, "day"));
export const saturday = isoDate(moment(monday).add(5, "day"));
export const sunday = isoDate(moment(monday).add(6, "day"));

export const lastMonday = isoDate(moment(monday).subtract(1, "week"));
export const lastTuesday = isoDate(moment(tuesday).subtract(1, "week"));
export const lastWednesday = isoDate(moment(tuesday).subtract(1, "week"));
export const lastThursday = isoDate(moment(tuesday).subtract(1, "week"));
export const lastFriday = isoDate(moment(friday).subtract(1, "week"));

export const firstDayOfMonth = isoDate(moment().startOf("month"));
export const secondDayOfMonth = isoDate(moment(firstDayOfMonth).add(1, "day"));
export const thirdDayOfMonth = isoDate(moment(firstDayOfMonth).add(2, "day"));
export const fourthDayOfMonth = isoDate(moment(firstDayOfMonth).add(3, "day"));
export const fifthDayOfMonth = isoDate(moment(firstDayOfMonth).add(4, "day"));
export const lastDayOfMonth = isoDate(moment().endOf("month"));

export const firstDayOfLastMonth = isoDate(moment(firstDayOfMonth).subtract(1, "month"));
export const secondDayOfLastMonth = isoDate(moment(secondDayOfMonth).subtract(1, "month"));
export const thirdDayOfLastMonth = isoDate(moment(thirdDayOfMonth).subtract(1, "month"));
export const fourthDayOfLastMonth = isoDate(moment(fourthDayOfMonth).subtract(1, "month"));
export const fifthDayOfLastMonth = isoDate(moment(fifthDayOfMonth).subtract(1, "month"));
export const endOfLastMonth = isoDate(moment(firstDayOfLastMonth).endOf("month"));

export const never = isoDate(moment(0));
