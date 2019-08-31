import { EmployeeRepository } from "../../repositories";

export type DeleteEmployee = (employeeId: number) => Promise<void>;

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function buildDeleteEmployee({ employeeRepository }: Dependencies): DeleteEmployee {
    return async function deleteEmployee(employeeId: number): Promise<void> {
        await employeeRepository.deleteById(employeeId);
    };
}
