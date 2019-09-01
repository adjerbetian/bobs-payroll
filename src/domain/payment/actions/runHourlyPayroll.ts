import { CoreActions, HourlyEmployee } from "../../core";
import { CreatePaymentForEmployee } from "./CreatePaymentForEmployee";
import { RunPayroll } from "./RunPayroll";

export type ComputeHourlyEmployeePaymentDueAmount = (employee: HourlyEmployee) => Promise<number>;
interface Dependencies {
    coreActions: CoreActions;
    computeHourlyEmployeePaymentDueAmount: ComputeHourlyEmployeePaymentDueAmount;
    createPaymentForEmployee: CreatePaymentForEmployee;
}

export function buildRunHourlyPayroll({
    coreActions,
    computeHourlyEmployeePaymentDueAmount,
    createPaymentForEmployee
}: Dependencies): RunPayroll {
    return async function(date: string): Promise<void> {
        const employees = await coreActions.fetchAllHourly();
        for (const employee of employees) {
            await payEmployee(date, employee);
        }
    };

    async function payEmployee(date: string, employee: HourlyEmployee): Promise<void> {
        await createPaymentForEmployee({
            employeeId: employee.id,
            date: date,
            amount: await computeHourlyEmployeePaymentDueAmount(employee)
        });
    }
}
