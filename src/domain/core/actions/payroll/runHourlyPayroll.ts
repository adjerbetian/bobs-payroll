import { HourlyEmployee } from "../../entities";
import { EmployeeRepository } from "../../repositories";
import { CreatePaymentForEmployeeAction } from "./CreatePaymentForEmployeeAction";
import { RunPayrollAction } from "./RunPayrollAction";

export type ComputeHourlyEmployeePaymentDueAmountAction = (employee: HourlyEmployee) => Promise<number>;
interface Dependencies {
    employeeRepository: EmployeeRepository;
    computeHourlyEmployeePaymentDueAmount: ComputeHourlyEmployeePaymentDueAmountAction;
    createPaymentForEmployee: CreatePaymentForEmployeeAction;
}

export function buildRunHourlyPayrollAction({
    employeeRepository,
    computeHourlyEmployeePaymentDueAmount,
    createPaymentForEmployee
}: Dependencies): RunPayrollAction {
    return async function(date: string): Promise<void> {
        const employees = await employeeRepository.fetchAllHourly();
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
