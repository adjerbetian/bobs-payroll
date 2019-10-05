import { Entity } from "./Entity";

export interface TimeCard extends Entity {
    getEmployeeId(): number;
    getDate(): string;
    getHours(): number;
    getRegularHours(): number;
    getExtraHours(): number;
}

export function buildTimeCard({
    employeeId,
    date,
    hours
}: {
    employeeId: number;
    date: string;
    hours: number;
}): TimeCard {
    const REGULAR_HOURS_PER_DAY = 8;

    return Object.freeze({
        getEmployeeId() {
            return employeeId;
        },
        getDate() {
            return date;
        },
        getHours() {
            return hours;
        },
        getRegularHours() {
            return Math.min(hours, REGULAR_HOURS_PER_DAY);
        },
        getExtraHours() {
            return Math.max(hours - REGULAR_HOURS_PER_DAY, 0);
        },
        toJSON() {
            return {
                entity: "TimeCard",
                employeeId,
                date,
                hours
            };
        }
    });
}
