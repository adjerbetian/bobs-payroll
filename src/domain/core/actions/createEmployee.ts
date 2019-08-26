import { Employee } from "../entities";
import { EmployeeRepository } from "../repositories";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export type CreateEmployeeAction = (employee: Employee) => Promise<void>;

export function buildCreateEmployeeAction({ employeeRepository }: Dependencies): CreateEmployeeAction {
    return async function(employee: Employee): Promise<void> {
        await employeeRepository.insert(employee);
    };
}
