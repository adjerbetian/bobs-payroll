import { Employee } from "../../entities";
import { EmployeeRepository } from "../../repositories";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export type CreateEmployee = (employee: Employee) => Promise<void>;

export function buildCreateEmployee({ employeeRepository }: Dependencies): CreateEmployee {
    return async function(employee: Employee): Promise<void> {
        await employeeRepository.insert(employee);
    };
}
