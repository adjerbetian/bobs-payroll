import { EmployeeRepository } from "../repositories";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function buildChangeEmployeeTransaction({ employeeRepository }: Dependencies) {
    return async function(id: string, updateType: string, ...rest: string[]): Promise<void> {
        if (updateType === "Name") {
            const [name] = rest;
            return employeeRepository.updateById(parseInt(id), { name });
        }
        if (updateType === "Address") {
            const [address] = rest;
            return employeeRepository.updateById(parseInt(id), { address });
        }
    };
}
