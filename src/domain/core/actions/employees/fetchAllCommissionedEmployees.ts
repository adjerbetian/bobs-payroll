import { CommissionedEmployee } from "../../entities";
import { EmployeeRepository } from "../../repositories";
import { CoreEmployeeActions } from "../CoreActions";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function buildFetchAllCommissionedEmployees({
    employeeRepository
}: Dependencies): CoreEmployeeActions["fetchAllCommissionedEmployees"] {
    return async function(): Promise<CommissionedEmployee[]> {
        return employeeRepository.fetchAllCommissioned();
    };
}
