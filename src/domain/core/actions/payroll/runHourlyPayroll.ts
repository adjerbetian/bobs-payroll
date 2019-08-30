import { HourlyEmployee, Payment, TimeCard } from "../../entities";
import { EmployeeRepository, PaymentMethodRepository, PaymentRepository, TimeCardRepository } from "../../repositories";
import { RunPayrollAction } from "./RunPayrollAction";
import { buildFetchEmployeePaymentMethod } from "./utils";

interface Dependencies {
    paymentRepository: PaymentRepository;
    employeeRepository: EmployeeRepository;
    timeCardRepository: TimeCardRepository;
    paymentMethodRepository: PaymentMethodRepository;
}

export function buildRunHourlyPayrollAction({
    employeeRepository,
    paymentMethodRepository,
    paymentRepository,
    timeCardRepository
}: Dependencies): RunPayrollAction {
    const fetchEmployeePaymentMethod = buildFetchEmployeePaymentMethod(paymentMethodRepository);

    return async function(date: string): Promise<void> {
        const employees = await employeeRepository.fetchAllHourly();
        for (const employee of employees) {
            await runEmployeePayroll(date, employee);
        }
    };

    async function runEmployeePayroll(date: string, employee: HourlyEmployee): Promise<void> {
        const payment = await buildPayment();
        await paymentRepository.insert(payment);

        async function buildPayment(): Promise<Payment> {
            return {
                employeeId: employee.id,
                date: date,
                method: await fetchEmployeePaymentMethod(employee.id),
                amount: await computeEmployeePaymentDueAmount()
            };
        }

        async function computeEmployeePaymentDueAmount(): Promise<number> {
            const dueTimeCards = await fetchEmployeeDueTimeCards();
            const regularHours = computeTimeCardsRegularHours(dueTimeCards);
            const extraHours = computeTimeCardsExtraHours(dueTimeCards);
            return employee.work.hourlyRate * (regularHours + 1.5 * extraHours);
        }

        async function fetchEmployeeDueTimeCards(): Promise<TimeCard[]> {
            const lastPaymentDate = await paymentRepository.fetchEmployeeLastPaymentDate(employee.id);
            return timeCardRepository.fetchAllOfEmployeeSince(employee.id, lastPaymentDate);
        }

        function computeTimeCardsRegularHours(timeCards: TimeCard[]): number {
            return timeCards.reduce((total, timeCard) => total + Math.min(timeCard.hours, 8), 0);
        }

        function computeTimeCardsExtraHours(timeCards: TimeCard[]): number {
            return timeCards.reduce((total, timeCard) => total + Math.max(timeCard.hours - 8, 0), 0);
        }
    }
}
