import { CommissionedEmployee } from "../../entities";
import { EmployeeRepository } from "../../repositories";
import { CreatePaymentForEmployeeAction } from "./CreatePaymentForEmployeeAction";
import { RunPayrollAction } from "./RunPayrollAction";

interface Dependencies {
    employeeRepository: EmployeeRepository;
    createPaymentForEmployee: CreatePaymentForEmployeeAction;
}

export function buildRunCommissionedPayrollAction({
    employeeRepository,
    createPaymentForEmployee
}: Dependencies): RunPayrollAction {
    return async function(date: string): Promise<void> {
        const employees = await employeeRepository.fetchAllCommissioned();
        for (const employee of employees) {
            await payEmployee(date, employee);
        }
    };

    async function payEmployee(date: string, employee: CommissionedEmployee): Promise<void> {
        await createPaymentForEmployee({
            employeeId: employee.id,
            amount: employee.work.monthlySalary,
            date
        });
    }
}
