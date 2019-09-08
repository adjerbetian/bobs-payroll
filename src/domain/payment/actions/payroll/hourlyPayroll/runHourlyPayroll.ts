import { buildEmployeeEntity, CoreActions, HourlyEmployee, TimeCard } from "../../../../core";
import { PaymentRepository } from "../../../repositories";
import { CreatePaymentForEmployee } from "../../payment";
import { RunPayrollActions } from "../runPayrollDispatcher";

interface Dependencies {
    coreActions: CoreActions;
    paymentRepository: PaymentRepository;
    createPaymentForEmployee: CreatePaymentForEmployee;
}

export function makeRunHourlyPayroll({
    coreActions,
    paymentRepository,
    createPaymentForEmployee
}: Dependencies): RunPayrollActions["runHourlyPayroll"] {
    return async function(date: string): Promise<void> {
        const employees = await coreActions.fetchAllHourlyEmployees();
        for (const employee of employees) {
            await payEmployee(date, employee);
        }
    };

    async function payEmployee(date: string, employee: HourlyEmployee): Promise<void> {
        await createPaymentForEmployee({
            employeeId: employee.id,
            date: date,
            amount: await computePayAmount()
        });

        async function computePayAmount(): Promise<number> {
            const dueTimeCards = await fetchEmployeeDueTimeCards(employee.id);
            console.log(dueTimeCards.map(tc => tc.getHours()));
            const entity = buildEmployeeEntity(employee);
            return entity.computePayAmount(dueTimeCards);
        }

        async function fetchEmployeeDueTimeCards(employeeId: number): Promise<TimeCard[]> {
            const lastPaymentDate = await paymentRepository.fetchEmployeeLastPaymentDate(employeeId);
            return coreActions.fetchEmployeeTimeCardsSince(employeeId, lastPaymentDate);
        }
    }
}
