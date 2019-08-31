import { HourlyEmployee } from "../../entities";
import { EmployeeRepository } from "../../repositories";
import { CreatePaymentForEmployee } from "./CreatePaymentForEmployee";
import { RunPayroll } from "./RunPayroll";

export type ComputeHourlyEmployeePaymentDueAmount = (employee: HourlyEmployee) => Promise<number>;
interface Dependencies {
    employeeRepository: EmployeeRepository;
    computeHourlyEmployeePaymentDueAmount: ComputeHourlyEmployeePaymentDueAmount;
    createPaymentForEmployee: CreatePaymentForEmployee;
}

export function buildRunHourlyPayroll({
    employeeRepository,
    computeHourlyEmployeePaymentDueAmount,
    createPaymentForEmployee
}: Dependencies): RunPayroll {
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
