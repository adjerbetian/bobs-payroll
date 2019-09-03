import { CommissionedEmployee, CoreActions } from "../../../../core";
import { CreatePaymentForEmployee } from "../../payment";
import { RunPayrollActions } from "../runPayrollDispatcher";

export type ComputeEmployeeCommission = (date: string, employee: CommissionedEmployee) => Promise<number>;

interface Dependencies {
    coreActions: CoreActions;
    createPaymentForEmployee: CreatePaymentForEmployee;
    computeEmployeeCommission: ComputeEmployeeCommission;
}

export function buildRunCommissionedPayroll({
    coreActions,
    createPaymentForEmployee,
    computeEmployeeCommission
}: Dependencies): RunPayrollActions["runCommissionedPayroll"] {
    return async function(date: string): Promise<void> {
        const employees = await coreActions.fetchAllCommissionedEmployees();
        for (const employee of employees) {
            await payEmployee(date, employee);
        }
    };

    async function payEmployee(date: string, employee: CommissionedEmployee): Promise<void> {
        await createPaymentForEmployee({
            employeeId: employee.id,
            amount: await computePayAmount(date, employee),
            date
        });
    }

    async function computePayAmount(date: string, employee: CommissionedEmployee): Promise<number> {
        const commission = await computeEmployeeCommission(date, employee);
        return employee.work.monthlySalary + commission;
    }
}
