import { EmployeeType, HourlyEmployee } from "../Employee";
import { TimeCard } from "../TimeCard";

export function buildHourlyEmployee({
    id,
    name,
    address,
    hourlyRate
}: {
    id: number;
    name: string;
    address: string;
    hourlyRate: number;
}): HourlyEmployee {
    return Object.freeze({
        getId() {
            return id;
        },
        getAddress() {
            return address;
        },
        getName() {
            return name;
        },
        getType() {
            return EmployeeType.HOURLY;
        },
        hasType(type: EmployeeType) {
            return type === EmployeeType.HOURLY;
        },
        getHourlyRate() {
            return hourlyRate;
        },
        computePayAmount(timeCards: TimeCard[]): number {
            const regularHours = computeTimeCardsRegularHours();
            const extraHours = computeTimeCardsExtraHours();
            return hourlyRate * (regularHours + 1.5 * extraHours);

            function computeTimeCardsRegularHours(): number {
                return timeCards.reduce((total, timeCard) => total + timeCard.getRegularHours(), 0);
            }

            function computeTimeCardsExtraHours(): number {
                return timeCards.reduce((total, timeCard) => total + timeCard.getExtraHours(), 0);
            }
        },
        toJSON() {
            return {
                id,
                name,
                address,
                hourlyRate,
                type: EmployeeType.HOURLY
            };
        }
    });
}
