import { executePayrollCommand } from "@test/cucumber";
import { When } from "cucumber";
import { store } from "../../utils";

When(
    "I execute the ChgEmp command on {string} to change the {string} to {string}",
    async (name: string, field: string, value: string) => {
        const employee = store.employees.get(name);
        if (field === "name") {
            return executePayrollCommand(`ChgEmp ${employee.getId()} Name "${value}"`);
        }
        if (field === "address") {
            return executePayrollCommand(`ChgEmp ${employee.getId()} Address "${value}"`);
        }
    }
);
When(
    "I execute the ChgEmp command on {string} to change the type to hourly with a hourly rate of {float}",
    async (name: string, hourlyRate: number) => {
        const employee = store.employees.get(name);
        return executePayrollCommand(`ChgEmp ${employee.getId()} Hourly "${hourlyRate}"`);
    }
);
