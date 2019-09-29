import { Before } from "cucumber";
import { Employee, TimeCard } from "../../app";

export const store = buildVariablesStore();

Before(() => store.reset());

function buildVariablesStore(): Store {
    let employee: Employee | null;
    let timeCard: TimeCard | null;

    return {
        get employee(): Employee {
            if (!employee) throw new Error("no employee set");
            return employee;
        },
        set employee(newEmployee: Employee) {
            employee = newEmployee;
        },
        get timeCard(): TimeCard {
            if (!timeCard) throw new Error("no timeCard set");
            return timeCard;
        },
        set timeCard(newTimeCard: TimeCard) {
            timeCard = newTimeCard;
        },
        reset() {
            employee = null;
        }
    };
}

interface Store {
    timeCard: TimeCard;
    employee: Employee;
    reset(): void;
}
