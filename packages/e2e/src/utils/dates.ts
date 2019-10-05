import {
    endOfLastMonth,
    fifthDayOfLastMonth,
    fifthDayOfMonth,
    firstDayOfLastMonth,
    firstDayOfMonth,
    fourthDayOfLastMonth,
    fourthDayOfMonth,
    friday,
    lastDayOfMonth,
    lastFriday,
    lastMonday,
    lastThursday,
    lastTuesday,
    lastWednesday,
    monday,
    never,
    saturday,
    secondDayOfLastMonth,
    secondDayOfMonth,
    sunday,
    thirdDayOfLastMonth,
    thirdDayOfMonth,
    thursday,
    tuesday,
    wednesday
} from "@bobs-payroll/common";
import { buildNonNullMap } from "./NonNullMap";

export const dates = buildNonNullMap([
    ["monday", monday],
    ["tuesday", tuesday],
    ["wednesday", wednesday],
    ["thursday", thursday],
    ["friday", friday],
    ["saturday", saturday],
    ["sunday", sunday],

    ["last monday", lastMonday],
    ["last tuesday", lastTuesday],
    ["last wednesday", lastWednesday],
    ["last thursday", lastThursday],
    ["last friday", lastFriday],

    ["first day of the month", firstDayOfMonth],
    ["second day of the month", secondDayOfMonth],
    ["third day of the month", thirdDayOfMonth],
    ["fourth day of the month", fourthDayOfMonth],
    ["fifth day of the month", fifthDayOfMonth],
    ["last day of the month", lastDayOfMonth],

    ["first day of last month", firstDayOfLastMonth],
    ["second day of last month", secondDayOfLastMonth],
    ["third day of last month", thirdDayOfLastMonth],
    ["fourth day of last month", fourthDayOfLastMonth],
    ["fifth day of last month", fifthDayOfLastMonth],
    ["end of last month", endOfLastMonth],

    ["never", never]
]);
