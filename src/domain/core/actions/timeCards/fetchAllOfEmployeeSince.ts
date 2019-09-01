import { TimeCard } from "../../entities";
import { TimeCardRepository } from "../../repositories";
import { CoreTimeCardActions } from "../CoreActions";

interface Dependencies {
    timeCardRepository: TimeCardRepository;
}

export function buildFetchEmployeeTimeCardsSince({
    timeCardRepository
}: Dependencies): CoreTimeCardActions["fetchEmployeeTimeCardsSince"] {
    return async function(employeeId: number, date: string): Promise<TimeCard[]> {
        return timeCardRepository.fetchAllOfEmployeeSince(employeeId, date);
    };
}
