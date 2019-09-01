import { EmployeeRepository } from "../../repositories";
import { CoreEmployeeActions } from "../CoreActions";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function buildDeleteEmployee({ employeeRepository }: Dependencies): CoreEmployeeActions["deleteEmployee"] {
    return async function deleteEmployee(employeeId: number): Promise<void> {
        await employeeRepository.deleteById(employeeId);
    };
}
