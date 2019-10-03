import { EmployeeRepository } from "../../repositories";
import { CoreEmployeeUseCases } from "../CoreUseCases";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function makeFetchAllSalariedEmployees({
    employeeRepository
}: Dependencies): CoreEmployeeUseCases["fetchAllSalariedEmployees"] {
    return async function() {
        return employeeRepository.fetchAllSalaried();
    };
}
