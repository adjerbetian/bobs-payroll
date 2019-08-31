import { CommissionedEmployee, EmployeeRepository } from "../../core";
import { CreatePaymentForEmployee } from "./CreatePaymentForEmployee";
import { RunPayroll } from "./RunPayroll";

export type ComputeEmployeeCommission = (employee: CommissionedEmployee) => Promise<number>;

interface Dependencies {
    employeeRepository: EmployeeRepository;
    createPaymentForEmployee: CreatePaymentForEmployee;
    computeEmployeeCommission: ComputeEmployeeCommission;
}

export function buildRunCommissionedPayroll({
    employeeRepository,
    createPaymentForEmployee,
    computeEmployeeCommission
}: Dependencies): RunPayroll {
    return async function(date: string): Promise<void> {
        const employees = await employeeRepository.fetchAllCommissioned();
        for (const employee of employees) {
            await payEmployee(date, employee);
        }
    };

    async function payEmployee(date: string, employee: CommissionedEmployee): Promise<void> {
        await createPaymentForEmployee({
            employeeId: employee.id,
            amount: await computePayAmount(employee),
            date
        });
    }

    async function computePayAmount(employee: CommissionedEmployee): Promise<number> {
        const commission = await computeEmployeeCommission(employee);
        return employee.work.monthlySalary + commission;
    }
}
