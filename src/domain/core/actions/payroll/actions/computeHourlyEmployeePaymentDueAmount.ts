import { HourlyEmployee, TimeCard } from "../../../entities";
import { PaymentRepository, TimeCardRepository } from "../../../repositories";
import { ComputeHourlyEmployeePaymentDueAmount } from "../runHourlyPayroll";

interface Dependencies {
    paymentRepository: PaymentRepository;
    timeCardRepository: TimeCardRepository;
}

export function buildComputeHourlyEmployeePaymentDueAmount({
    paymentRepository,
    timeCardRepository
}: Dependencies): ComputeHourlyEmployeePaymentDueAmount {
    return async function(employee: HourlyEmployee): Promise<number> {
        const dueTimeCards = await fetchEmployeeDueTimeCards(employee.id);
        const regularHours = computeTimeCardsRegularHours(dueTimeCards);
        const extraHours = computeTimeCardsExtraHours(dueTimeCards);
        return employee.work.hourlyRate * (regularHours + 1.5 * extraHours);
    };

    async function fetchEmployeeDueTimeCards(employeeId: number): Promise<TimeCard[]> {
        const lastPaymentDate = await paymentRepository.fetchEmployeeLastPaymentDate(employeeId);
        return timeCardRepository.fetchAllOfEmployeeSince(employeeId, lastPaymentDate);
    }

    function computeTimeCardsRegularHours(timeCards: TimeCard[]): number {
        return timeCards.reduce((total, timeCard) => total + Math.min(timeCard.hours, 8), 0);
    }

    function computeTimeCardsExtraHours(timeCards: TimeCard[]): number {
        return timeCards.reduce((total, timeCard) => total + Math.max(timeCard.hours - 8, 0), 0);
    }
}
