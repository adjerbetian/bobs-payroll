import { CoreUseCases, HourlyEmployee, TimeCard } from "@modules/core";
import { PaymentRepository } from "../../../repositories";
import { CreatePaymentForEmployee } from "../../payment";
import { RunPayrollUseCases } from "../runPayrollDispatcher";

interface Dependencies {
    coreUseCases: CoreUseCases;
    paymentRepository: PaymentRepository;
    createPaymentForEmployee: CreatePaymentForEmployee;
}

export function makeRunHourlyPayroll({
    coreUseCases,
    paymentRepository,
    createPaymentForEmployee
}: Dependencies): RunPayrollUseCases["runHourlyPayroll"] {
    return async function(date) {
        const employees = await coreUseCases.fetchAllHourlyEmployees();
        for (const employee of employees) {
            await payEmployee(date, employee);
        }
    };

    async function payEmployee(date: string, employee: HourlyEmployee): Promise<void> {
        await createPaymentForEmployee({
            employeeId: employee.getId(),
            date: date,
            amount: await computePayAmount()
        });

        async function computePayAmount(): Promise<number> {
            const dueTimeCards = await fetchEmployeeDueTimeCards(employee.getId());
            return employee.computePayAmount(dueTimeCards);
        }

        async function fetchEmployeeDueTimeCards(employeeId: number): Promise<TimeCard[]> {
            const lastPaymentDate = await paymentRepository.fetchEmployeeLastPaymentDate(employeeId);
            return coreUseCases.fetchEmployeeTimeCardsSince(employeeId, lastPaymentDate);
        }
    }
}
