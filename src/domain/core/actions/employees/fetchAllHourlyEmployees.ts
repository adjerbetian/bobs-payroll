import { HourlyEmployee } from "../../entities";
import { EmployeeRepository } from "../../repositories";
import { CoreEmployeeActions } from "../CoreActions";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function buildFetchAllHourlyEmployees({
    employeeRepository
}: Dependencies): CoreEmployeeActions["fetchAllHourlyEmployees"] {
    return async function(): Promise<HourlyEmployee[]> {
        return employeeRepository.fetchAllHourly();
    };
}
