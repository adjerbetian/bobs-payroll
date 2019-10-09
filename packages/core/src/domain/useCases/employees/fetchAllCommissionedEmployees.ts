import { EmployeeRepository } from "../../repositories";
import { CoreEmployeeUseCases } from "../CoreUseCases";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function makeFetchAllCommissionedEmployees({
    employeeRepository
}: Dependencies): CoreEmployeeUseCases["fetchAllCommissionedEmployees"] {
    return async function() {
        return employeeRepository.fetchAllCommissioned();
    };
}
