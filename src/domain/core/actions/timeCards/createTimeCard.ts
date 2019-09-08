import { EmployeeType, TimeCard } from "../../entities";
import { EmployeeTypeError } from "../../errors";
import { EmployeeRepository, TimeCardRepository } from "../../repositories";
import { CoreTimeCardActions } from "../CoreActions";

interface Dependencies {
    employeeRepository: EmployeeRepository;
    timeCardRepository: TimeCardRepository;
}

export function makeCreateTimeCard({
    employeeRepository,
    timeCardRepository
}: Dependencies): CoreTimeCardActions["createTimeCard"] {
    return async function(timeCard: TimeCard): Promise<void> {
        await assertEmployeeIsHourly(timeCard.getEmployeeId());
        await timeCardRepository.insert(timeCard);
    };

    async function assertEmployeeIsHourly(employeeId: number): Promise<void> {
        const employee = await employeeRepository.fetchById(employeeId);
        if (employee.work.type !== EmployeeType.HOURLY) {
            throw new EmployeeTypeError(employee, EmployeeType.HOURLY);
        }
    }
}
