import { HourlyEmployee, PaymentMethod } from "../../entities";
import { EmployeeRepository, PaymentRepository } from "../../repositories";
import { RunPayrollAction } from "./RunPayrollAction";

export type ComputeHourlyEmployeePaymentDueAmountAction = (employee: HourlyEmployee) => Promise<number>;
export type FetchEmployeePaymentMethodAction = (employeeId: number) => Promise<PaymentMethod>;
interface Dependencies {
    paymentRepository: PaymentRepository;
    employeeRepository: EmployeeRepository;
    computeHourlyEmployeePaymentDueAmount: ComputeHourlyEmployeePaymentDueAmountAction;
    fetchEmployeePaymentMethod: FetchEmployeePaymentMethodAction;
}

export function buildRunHourlyPayrollAction({
    employeeRepository,
    paymentRepository,
    computeHourlyEmployeePaymentDueAmount,
    fetchEmployeePaymentMethod
}: Dependencies): RunPayrollAction {
    return async function(date: string): Promise<void> {
        const employees = await employeeRepository.fetchAllHourly();
        for (const employee of employees) {
            await payEmployee(date, employee);
        }
    };

    async function payEmployee(date: string, employee: HourlyEmployee): Promise<void> {
        await paymentRepository.insert({
            employeeId: employee.id,
            date: date,
            method: await fetchEmployeePaymentMethod(employee.id),
            amount: await computeHourlyEmployeePaymentDueAmount(employee)
        });
    }
}
