import { TimeCardRepository } from "../../repositories";
import { CoreTimeCardActions } from "../CoreActions";

interface Dependencies {
    timeCardRepository: TimeCardRepository;
}

export function makeFetchEmployeeTimeCardsSince({
    timeCardRepository
}: Dependencies): CoreTimeCardActions["fetchEmployeeTimeCardsSince"] {
    return async function(employeeId, date) {
        return timeCardRepository.fetchAllOfEmployeeSince(employeeId, date);
    };
}
