import { HourlyEmployee } from "../../entities";
import { EmployeeRepository, PaymentRepository } from "../../repositories";
import { ComputeHourlyEmployeePaymentDueAmountAction, FetchEmployeePaymentMethodAction } from "./actions";
import { RunPayrollAction } from "./RunPayrollAction";

interface RepositoryDependencies {
    paymentRepository: PaymentRepository;
    employeeRepository: EmployeeRepository;
}

interface PayrollActionsDependencies {
    computeHourlyEmployeePaymentDueAmount: ComputeHourlyEmployeePaymentDueAmountAction;
    fetchEmployeePaymentMethod: FetchEmployeePaymentMethodAction;
}

export function buildRunHourlyPayrollAction(
    { employeeRepository, paymentRepository }: RepositoryDependencies,
    { computeHourlyEmployeePaymentDueAmount, fetchEmployeePaymentMethod }: PayrollActionsDependencies
): RunPayrollAction {
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
