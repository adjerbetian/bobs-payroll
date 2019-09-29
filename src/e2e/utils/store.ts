import { Before } from "cucumber";
import { Employee, TimeCard } from "../../app";
import { buildNonNullMap, NonNullMap } from "./NonNullMap";

export const store = buildVariablesStore();
Before(() => store.reset());

interface Store {
    employees: NonNullMap<Employee>;
    timeCards: NonNullMap<TimeCard>;
    reset(): void;
}

function buildVariablesStore(): Store {
    const employeeMap = buildNonNullMap<Employee>();
    const timeCardMap = buildNonNullMap<TimeCard>();

    return {
        get employees() {
            return employeeMap;
        },
        get timeCards() {
            return timeCardMap;
        },
        reset() {
            employeeMap.reset();
        }
    };
}
