import { Before } from "cucumber";
import { Employee } from "../../app";

export const store = buildVariablesStore();

Before(() => store.reset());

function buildVariablesStore(): Store {
    let employee: Employee | null;

    return {
        get employee(): Employee {
            if (!employee) throw new Error("no employee set");

            return employee;
        },
        set employee(newEmployee: Employee) {
            employee = newEmployee;
        },
        reset() {
            employee = null;
        }
    };
}

interface Store {
    employee: Employee;
    reset(): void;
}
