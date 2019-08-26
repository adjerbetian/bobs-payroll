import { Employee } from "../entities";
import { EmployeeRepository } from "../repositories";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export type UpdateEmployeeAction = (employeeId: number, employee: Partial<Employee>) => Promise<void>;

export function buildUpdateEmployeeAction({ employeeRepository }: Dependencies): UpdateEmployeeAction {
    return async function(employeeId: number, update: Partial<Employee>): Promise<void> {
        await employeeRepository.updateById(employeeId, update);
    };
}
