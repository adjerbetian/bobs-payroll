import { CoreUseCases, SalariedEmployee } from "@modules/core";
import { CreatePaymentForEmployee } from "../../payment";
import { RunPayrollUseCases } from "../runPayrollDispatcher";

interface Dependencies {
    coreUseCases: CoreUseCases;
    createPaymentForEmployee: CreatePaymentForEmployee;
}

export function makeRunSalariedPayroll({
    coreUseCases,
    createPaymentForEmployee
}: Dependencies): RunPayrollUseCases["runSalariedPayroll"] {
    return async function(date) {
        const employees = await coreUseCases.fetchAllSalariedEmployees();
        for (const employee of employees) {
            await payEmployee(date, employee);
        }
    };

    async function payEmployee(date: string, employee: SalariedEmployee): Promise<void> {
        await createPaymentForEmployee({
            employeeId: employee.getId(),
            date: date,
            amount: employee.getSalary()
        });
    }
}
