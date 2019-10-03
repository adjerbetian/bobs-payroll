import { EmployeeRepository } from "../../repositories";
import { CoreEmployeeUseCases } from "../CoreUseCases";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function makeFetchAllHourlyEmployees({
    employeeRepository
}: Dependencies): CoreEmployeeUseCases["fetchAllHourlyEmployees"] {
    return async function() {
        return employeeRepository.fetchAllHourly();
    };
}
