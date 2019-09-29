import {
    endOfLastMonth,
    firstDayOfLastMonth,
    firstDayOfMonth,
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
    secondDayOfMonth,
    sunday,
    thursday,
    tuesday,
    wednesday
} from "@test/utils";
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
    ["last day of the month", lastDayOfMonth],

    ["first day of last month", firstDayOfLastMonth],
    ["end of last month", endOfLastMonth],

    ["never", never]
]);
