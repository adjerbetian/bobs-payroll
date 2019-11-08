import * as moment from "moment";
import { µ } from "./micro";

export const monday = µ.isoDate(moment().startOf("isoWeek"));
export const tuesday = µ.isoDate(moment(monday).add(1, "day"));
export const wednesday = µ.isoDate(moment(monday).add(2, "day"));
export const thursday = µ.isoDate(moment(monday).add(3, "day"));
export const friday = µ.isoDate(moment(monday).add(4, "day"));
export const saturday = µ.isoDate(moment(monday).add(5, "day"));
export const sunday = µ.isoDate(moment(monday).add(6, "day"));

export const lastMonday = µ.isoDate(moment(monday).subtract(1, "week"));
export const lastTuesday = µ.isoDate(moment(tuesday).subtract(1, "week"));
export const lastWednesday = µ.isoDate(moment(tuesday).subtract(1, "week"));
export const lastThursday = µ.isoDate(moment(tuesday).subtract(1, "week"));
export const lastFriday = µ.isoDate(moment(friday).subtract(1, "week"));

export const firstDayOfMonth = µ.isoDate(moment().startOf("month"));
export const secondDayOfMonth = µ.isoDate(moment(firstDayOfMonth).add(1, "day"));
export const thirdDayOfMonth = µ.isoDate(moment(firstDayOfMonth).add(2, "day"));
export const fourthDayOfMonth = µ.isoDate(moment(firstDayOfMonth).add(3, "day"));
export const fifthDayOfMonth = µ.isoDate(moment(firstDayOfMonth).add(4, "day"));
export const lastDayOfMonth = µ.isoDate(moment().endOf("month"));

export const firstDayOfLastMonth = µ.isoDate(moment(firstDayOfMonth).subtract(1, "month"));
export const secondDayOfLastMonth = µ.isoDate(moment(secondDayOfMonth).subtract(1, "month"));
export const thirdDayOfLastMonth = µ.isoDate(moment(thirdDayOfMonth).subtract(1, "month"));
export const fourthDayOfLastMonth = µ.isoDate(moment(fourthDayOfMonth).subtract(1, "month"));
export const fifthDayOfLastMonth = µ.isoDate(moment(fifthDayOfMonth).subtract(1, "month"));
export const endOfLastMonth = µ.isoDate(moment(firstDayOfLastMonth).endOf("month"));

export const never = µ.isoDate(moment(0));
