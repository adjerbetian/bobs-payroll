import { CommissionedEmployee } from "../../entities";
import { EmployeeRepository } from "../../repositories";
import { CoreEmployeeActions } from "../CoreActions";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function buildFetchAllCommissioned({
    employeeRepository
}: Dependencies): CoreEmployeeActions["fetchAllCommissioned"] {
    return async function(): Promise<CommissionedEmployee[]> {
        return employeeRepository.fetchAllCommissioned();
    };
}