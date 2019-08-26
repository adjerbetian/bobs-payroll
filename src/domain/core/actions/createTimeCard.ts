import { EmployeeTypeError } from "../errors";
import { EmployeeType, TimeCard } from "../entities";
import { EmployeeRepository, TimeCardRepository } from "../repositories";

export type CreateTimeCardAction = (timeCard: TimeCard) => Promise<void>;

interface Dependencies {
    employeeRepository: EmployeeRepository;
    timeCardRepository: TimeCardRepository;
}

export function buildCreateTimeCardAction({
    employeeRepository,
    timeCardRepository
}: Dependencies): CreateTimeCardAction {
    return async function(timeCard: TimeCard): Promise<void> {
        await assertEmployeeIsHourly(timeCard.employeeId);
        await timeCardRepository.insert(timeCard);
    };

    async function assertEmployeeIsHourly(employeeId: number): Promise<void> {
        const employee = await employeeRepository.fetchById(employeeId);
        if (employee.type !== EmployeeType.HOURLY) {
            throw new EmployeeTypeError(employee, EmployeeType.HOURLY);
        }
    }
}