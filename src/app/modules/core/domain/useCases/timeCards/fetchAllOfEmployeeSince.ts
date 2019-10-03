import { TimeCardRepository } from "../../repositories";
import { CoreTimeCardUseCases } from "../CoreUseCases";

interface Dependencies {
    timeCardRepository: TimeCardRepository;
}

export function makeFetchEmployeeTimeCardsSince({
    timeCardRepository
}: Dependencies): CoreTimeCardUseCases["fetchEmployeeTimeCardsSince"] {
    return async function(employeeId, date) {
        return timeCardRepository.fetchAllOfEmployeeSince(employeeId, date);
    };
}
