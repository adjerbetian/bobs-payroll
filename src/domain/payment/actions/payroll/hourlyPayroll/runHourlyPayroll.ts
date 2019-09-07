import { CoreActions, HourlyEmployee } from "../../../../core";
import { CreatePaymentForEmployee } from "../../payment";
import { RunPayrollActions } from "../runPayrollDispatcher";

export type ComputeHourlyEmployeePaymentDueAmount = (employee: HourlyEmployee) => Promise<number>;
interface Dependencies {
    coreActions: CoreActions;
    computeHourlyEmployeePaymentDueAmount: ComputeHourlyEmployeePaymentDueAmount;
    createPaymentForEmployee: CreatePaymentForEmployee;
}

export function makeRunHourlyPayroll({
    coreActions,
    computeHourlyEmployeePaymentDueAmount,
    createPaymentForEmployee
}: Dependencies): RunPayrollActions["runHourlyPayroll"] {
    return async function(date: string): Promise<void> {
        const employees = await coreActions.fetchAllHourlyEmployees();
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
