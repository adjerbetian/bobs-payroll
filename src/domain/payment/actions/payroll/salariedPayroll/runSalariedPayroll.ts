import { CoreActions, SalariedEmployee } from "../../../../core";
import { CreatePaymentForEmployee } from "../../payment";
import { RunPayrollActions } from "../runPayrollDispatcher";

interface Dependencies {
    coreActions: CoreActions;
    createPaymentForEmployee: CreatePaymentForEmployee;
}

export function makeRunSalariedPayroll({
    coreActions,
    createPaymentForEmployee
}: Dependencies): RunPayrollActions["runSalariedPayroll"] {
    return async function(date: string): Promise<void> {
        const employees = await coreActions.fetchAllSalariedEmployees();
        for (const employee of employees) {
            await payEmployee(date, employee);
        }
    };

    async function payEmployee(date: string, employee: SalariedEmployee): Promise<void> {
        await createPaymentForEmployee({
            employeeId: employee.getId(),
            date: date,
            amount: employee.getSalary()
        });
    }
}
