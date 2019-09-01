import { EmployeeRepository, TimeCardRepository } from "../../repositories";
import { CoreTimeCardActions } from "../CoreActions";
import { buildCreateTimeCard } from "./createTimeCard";
import { buildFetchEmployeeTimeCardsSince } from "./fetchAllOfEmployeeSince";

interface Dependencies {
    employeeRepository: EmployeeRepository;
    timeCardRepository: TimeCardRepository;
}

export function buildCoreTimeCardActions({
    timeCardRepository,
    employeeRepository
}: Dependencies): CoreTimeCardActions {
    return {
        createTimeCard: buildCreateTimeCard({ employeeRepository, timeCardRepository }),
        fetchEmployeeTimeCardsSince: buildFetchEmployeeTimeCardsSince({ timeCardRepository })
    };
}
export { CoreTimeCardActions } from "../CoreActions";
