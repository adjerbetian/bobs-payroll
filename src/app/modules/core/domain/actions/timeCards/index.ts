import { EmployeeRepository, TimeCardRepository } from "../../repositories";
import { CoreTimeCardActions } from "../CoreActions";
import { makeCreateTimeCard } from "./createTimeCard";
import { makeFetchEmployeeTimeCardsSince } from "./fetchAllOfEmployeeSince";

interface Dependencies {
    employeeRepository: EmployeeRepository;
    timeCardRepository: TimeCardRepository;
}

export function makeCoreTimeCardActions({ timeCardRepository, employeeRepository }: Dependencies): CoreTimeCardActions {
    return {
        createTimeCard: makeCreateTimeCard({ employeeRepository, timeCardRepository }),
        fetchEmployeeTimeCardsSince: makeFetchEmployeeTimeCardsSince({ timeCardRepository })
    };
}
export { CoreTimeCardActions } from "../CoreActions";
