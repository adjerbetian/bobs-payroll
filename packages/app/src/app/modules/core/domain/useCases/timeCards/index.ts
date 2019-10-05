import { EmployeeRepository, TimeCardRepository } from "../../repositories";
import { CoreTimeCardUseCases } from "../CoreUseCases";
import { makeCreateTimeCard } from "./createTimeCard";
import { makeFetchEmployeeTimeCardsSince } from "./fetchAllOfEmployeeSince";

interface Dependencies {
    employeeRepository: EmployeeRepository;
    timeCardRepository: TimeCardRepository;
}

export function makeCoreTimeCardUseCases({
    timeCardRepository,
    employeeRepository
}: Dependencies): CoreTimeCardUseCases {
    return {
        createTimeCard: makeCreateTimeCard({ employeeRepository, timeCardRepository }),
        fetchEmployeeTimeCardsSince: makeFetchEmployeeTimeCardsSince({ timeCardRepository })
    };
}
export { CoreTimeCardUseCases } from "../CoreUseCases";
