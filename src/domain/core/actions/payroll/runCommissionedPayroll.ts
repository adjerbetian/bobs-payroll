import { CommissionedEmployee } from "../../entities";
import { EmployeeRepository, PaymentRepository } from "../../repositories";
import { FetchEmployeePaymentMethodAction } from "./FetchEmployeePaymentMethodAction";
import { RunPayrollAction } from "./RunPayrollAction";

interface Dependencies {
    paymentRepository: PaymentRepository;
    employeeRepository: EmployeeRepository;
    fetchEmployeePaymentMethod: FetchEmployeePaymentMethodAction;
}

export function buildRunCommissionedPayrollAction({
    employeeRepository,
    paymentRepository,
    fetchEmployeePaymentMethod
}: Dependencies): RunPayrollAction {
    return async function(date: string): Promise<void> {
        const employees = await employeeRepository.fetchAllCommissioned();
        for (const employee of employees) {
            await payEmployee(date, employee);
        }
    };

    async function payEmployee(date: string, employee: CommissionedEmployee): Promise<void> {
        // todo : extract common insertion of payment for employee in actions
        await paymentRepository.insert({
            employeeId: employee.id,
            date: date,
            method: await fetchEmployeePaymentMethod(employee.id),
            amount: employee.work.monthlySalary
        });
    }
}
