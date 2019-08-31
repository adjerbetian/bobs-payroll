import { SalariedEmployee } from "../../entities";
import { EmployeeRepository } from "../../repositories";
import { CreatePaymentForEmployeeAction } from "./CreatePaymentForEmployeeAction";
import { RunPayrollAction } from "./RunPayrollAction";

interface Dependencies {
    employeeRepository: EmployeeRepository;
    createPaymentForEmployee: CreatePaymentForEmployeeAction;
}

export function buildRunSalariedPayrollAction({
    employeeRepository,
    createPaymentForEmployee
}: Dependencies): RunPayrollAction {
    return async function(date: string): Promise<void> {
        const employees = await employeeRepository.fetchAllSalaried();
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
