import { Before } from "cucumber";
import { Employee, SalesReceipt, TimeCard } from "../../app";
import { buildNonNullMap, NonNullMap } from "./NonNullMap";

export const store = buildVariablesStore();
Before(() => store.reset());

interface Store {
    employees: NonNullMap<Employee>;
    timeCards: NonNullMap<TimeCard>;
    salesReceipts: NonNullMap<SalesReceipt>;
    reset(): void;
}

function buildVariablesStore(): Store {
    const employeeMap = buildNonNullMap<Employee>();
    const timeCardMap = buildNonNullMap<TimeCard>();
    const salesReceiptMap = buildNonNullMap<SalesReceipt>();

    return {
        get employees() {
            return employeeMap;
        },
        get timeCards() {
            return timeCardMap;
        },
        get salesReceipts() {
            return salesReceiptMap;
        },
        reset() {
            employeeMap.reset();
        }
    };
}
