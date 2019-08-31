import { CommissionedEmployee } from "../../entities";
import { EmployeeRepository } from "../../repositories";
import { CreatePaymentForEmployeeAction } from "./CreatePaymentForEmployeeAction";
import { RunPayrollAction } from "./RunPayrollAction";

export type ComputeEmployeeCommissionAction = (employee: CommissionedEmployee) => Promise<number>;

interface Dependencies {
    employeeRepository: EmployeeRepository;
    createPaymentForEmployee: CreatePaymentForEmployeeAction;
    computeEmployeeCommission: ComputeEmployeeCommissionAction;
}

export function buildRunCommissionedPayrollAction({
    employeeRepository,
    createPaymentForEmployee,
    computeEmployeeCommission
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
            amount: await computePayAmount(employee),
            date
        });
    }

    async function computePayAmount(employee: CommissionedEmployee): Promise<number> {
        const commission = await computeEmployeeCommission(employee);
        return employee.work.monthlySalary + commission;
    }
}
