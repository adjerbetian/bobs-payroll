import { CoreActions, SalariedEmployee } from "../../core";
import { CreatePaymentForEmployee } from "./CreatePaymentForEmployee";
import { RunPayroll } from "./RunPayroll";

interface Dependencies {
    coreActions: CoreActions;
    createPaymentForEmployee: CreatePaymentForEmployee;
}

export function buildRunSalariedPayroll({ coreActions, createPaymentForEmployee }: Dependencies): RunPayroll {
    return async function(date: string): Promise<void> {
        const employees = await coreActions.fetchAllSalaried();
        for (const employee of employees) {
            await payEmployee(date, employee);
        }
    };

    async function payEmployee(date: string, employee: SalariedEmployee): Promise<void> {
        await createPaymentForEmployee({
            employeeId: employee.id,
            date: date,
            amount: employee.work.monthlySalary
        });
    }
}
