import { EmployeeRepository, TimeCardRepository } from "../../repositories";
import { CoreTimeCardActions } from "./CoreTimeCardActions";
import { buildCreateTimeCard } from "./createTimeCard";

export { CoreTimeCardActions } from "./CoreTimeCardActions";

interface Dependencies {
    employeeRepository: EmployeeRepository;
    timeCardRepository: TimeCardRepository;
}

export function buildCoreTimeCardActions({
    timeCardRepository,
    employeeRepository
}: Dependencies): CoreTimeCardActions {
    return {
        createTimeCard: buildCreateTimeCard({ employeeRepository, timeCardRepository })
    };
}
