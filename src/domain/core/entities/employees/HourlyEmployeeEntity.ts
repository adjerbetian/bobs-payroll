import { TimeCard } from "../TimeCard";
import { HourlyEmployee } from "./HourlyEmployee";

export interface HourlyEmployeeEntity {
    computePayAmount(timeCards: TimeCard[]): number;
}

export function buildHourlyEmployeeEntity(employee: HourlyEmployee): HourlyEmployeeEntity {
    return {
        computePayAmount(timeCards: TimeCard[]): number {
            const regularHours = computeTimeCardsRegularHours();
            const extraHours = computeTimeCardsExtraHours();
            return employee.work.hourlyRate * (regularHours + 1.5 * extraHours);

            function computeTimeCardsRegularHours(): number {
                return timeCards.reduce((total, timeCard) => total + Math.min(timeCard.hours, 8), 0);
            }

            function computeTimeCardsExtraHours(): number {
                return timeCards.reduce((total, timeCard) => total + Math.max(timeCard.hours - 8, 0), 0);
            }
        }
    };
}
