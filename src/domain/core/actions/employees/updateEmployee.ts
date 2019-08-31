import { Employee } from "../../entities";
import { EmployeeRepository } from "../../repositories";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export type UpdateEmployee = (employeeId: number, employee: Partial<Employee>) => Promise<void>;

export function buildUpdateEmployee({ employeeRepository }: Dependencies): UpdateEmployee {
    return async function(employeeId: number, update: Partial<Employee>): Promise<void> {
        await employeeRepository.updateById(employeeId, update);
    };
}
