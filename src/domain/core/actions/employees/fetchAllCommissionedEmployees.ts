import { EmployeeRepository } from "../../repositories";
import { CoreEmployeeActions } from "../CoreActions";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function makeFetchAllCommissionedEmployees({
    employeeRepository
}: Dependencies): CoreEmployeeActions["fetchAllCommissionedEmployees"] {
    return async function() {
        return employeeRepository.fetchAllCommissioned();
    };
}
