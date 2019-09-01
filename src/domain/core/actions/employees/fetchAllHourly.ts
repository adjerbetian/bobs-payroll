import { HourlyEmployee } from "../../entities";
import { EmployeeRepository } from "../../repositories";
import { CoreEmployeeActions } from "../CoreActions";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function buildFetchAllHourly({ employeeRepository }: Dependencies): CoreEmployeeActions["fetchAllHourly"] {
    return async function(): Promise<HourlyEmployee[]> {
        return employeeRepository.fetchAllHourly();
    };
}
