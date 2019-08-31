import { SalariedEmployee } from "../../entities";
import { EmployeeRepository } from "../../repositories";
import { CreatePaymentForEmployee } from "./CreatePaymentForEmployee";
import { RunPayroll } from "./RunPayroll";

interface Dependencies {
    employeeRepository: EmployeeRepository;
    createPaymentForEmployee: CreatePaymentForEmployee;
}

export function buildRunSalariedPayroll({ employeeRepository, createPaymentForEmployee }: Dependencies): RunPayroll {
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
