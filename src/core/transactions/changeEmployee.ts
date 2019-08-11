import { EmployeeRepository } from "../repositories";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function buildChangeEmployeeTransaction({ employeeRepository }: Dependencies) {
    return async function(id: string, updateType: string, name: string): Promise<void> {
        await employeeRepository.updateById(parseInt(id), { name });
    };
}
