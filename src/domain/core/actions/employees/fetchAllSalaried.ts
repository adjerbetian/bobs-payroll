import { SalariedEmployee } from "../../entities";
import { EmployeeRepository } from "../../repositories";
import { CoreEmployeeActions } from "../CoreActions";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function buildFetchAllSalaried({ employeeRepository }: Dependencies): CoreEmployeeActions["fetchAllSalaried"] {
    return async function(): Promise<SalariedEmployee[]> {
        return employeeRepository.fetchAllSalaried();
    };
}
