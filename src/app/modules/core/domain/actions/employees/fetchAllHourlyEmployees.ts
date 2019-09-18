import { EmployeeRepository } from "../../repositories";
import { CoreEmployeeActions } from "../CoreActions";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function makeFetchAllHourlyEmployees({
    employeeRepository
}: Dependencies): CoreEmployeeActions["fetchAllHourlyEmployees"] {
    return async function() {
        return employeeRepository.fetchAllHourly();
    };
}
