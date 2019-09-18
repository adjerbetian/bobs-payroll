import { buildTimeCard, EmployeeType } from "../../entities";
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
    return async function(creationModel) {
        await assertEmployeeIsHourly(creationModel.employeeId);

        const timeCard = buildTimeCard(creationModel);
        await timeCardRepository.insert(timeCard);
    };

    async function assertEmployeeIsHourly(employeeId: number): Promise<void> {
        const employee = await employeeRepository.fetchById(employeeId);
        if (!employee.hasType(EmployeeType.HOURLY)) {
            throw new EmployeeTypeError(employee, EmployeeType.HOURLY);
        }
    }
}
