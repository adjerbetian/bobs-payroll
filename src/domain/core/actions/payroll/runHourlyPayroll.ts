import { HourlyEmployee, Payment, TimeCard } from "../../entities";
import { EmployeeRepository, PaymentMethodRepository, PaymentRepository, TimeCardRepository } from "../../repositories";
import { RunPayrollAction } from "../runPayroll";

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
                method: await paymentMethodRepository.fetchByEmployeeId(employee.id),
                amount: await computeEmployeePaymentDueAmount()
            };
        }

        async function computeEmployeePaymentDueAmount(): Promise<number> {
            const dueTimeCards = await fetchEmployeeDueTimeCards();
            const workedTime = dueTimeCards.reduce((total, timeCard) => total + timeCard.hours, 0);
            return employee.work.hourlyRate * workedTime;
        }

        async function fetchEmployeeDueTimeCards(): Promise<TimeCard[]> {
            const lastPaymentDate = await paymentRepository.fetchEmployeeLastPaymentDate(employee.id);
            return timeCardRepository.fetchAllOfEmployeeSince(employee.id, lastPaymentDate);
        }
    }
}
