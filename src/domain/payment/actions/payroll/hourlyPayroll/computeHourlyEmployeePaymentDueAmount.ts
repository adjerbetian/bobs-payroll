import { CoreActions, HourlyEmployee, TimeCard } from "../../../../core";
import { PaymentRepository } from "../../../repositories";
import { ComputeHourlyEmployeePaymentDueAmount } from "./runHourlyPayroll";

interface Dependencies {
    paymentRepository: PaymentRepository;
    coreActions: CoreActions;
}

export function buildComputeHourlyEmployeePaymentDueAmount({
    paymentRepository,
    coreActions
}: Dependencies): ComputeHourlyEmployeePaymentDueAmount {
    return async function(employee: HourlyEmployee): Promise<number> {
        const dueTimeCards = await fetchEmployeeDueTimeCards(employee.id);
        const regularHours = computeTimeCardsRegularHours(dueTimeCards);
        const extraHours = computeTimeCardsExtraHours(dueTimeCards);
        return employee.work.hourlyRate * (regularHours + 1.5 * extraHours);
    };

    async function fetchEmployeeDueTimeCards(employeeId: number): Promise<TimeCard[]> {
        const lastPaymentDate = await paymentRepository.fetchEmployeeLastPaymentDate(employeeId);
        return coreActions.fetchEmployeeTimeCardsSince(employeeId, lastPaymentDate);
    }

    function computeTimeCardsRegularHours(timeCards: TimeCard[]): number {
        return timeCards.reduce((total, timeCard) => total + Math.min(timeCard.hours, 8), 0);
    }

    function computeTimeCardsExtraHours(timeCards: TimeCard[]): number {
        return timeCards.reduce((total, timeCard) => total + Math.max(timeCard.hours - 8, 0), 0);
    }
}
