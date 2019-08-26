import { EmployeeRepository } from "../repositories";

export type DeleteEmployeeAction = (employeeId: number) => Promise<void>;

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function buildDeleteEmployeeAction({ employeeRepository }: Dependencies): DeleteEmployeeAction {
    return async function deleteEmployee(employeeId: number): Promise<void> {
        await employeeRepository.deleteById(employeeId);
    };
}
