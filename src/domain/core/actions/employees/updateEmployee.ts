import { Employee } from "../../entities";
import { EmployeeRepository } from "../../repositories";
import { CoreEmployeeActions } from "../CoreActions";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function buildUpdateEmployee({ employeeRepository }: Dependencies): CoreEmployeeActions["updateEmployee"] {
    return async function(employeeId: number, update: Partial<Employee>): Promise<void> {
        await employeeRepository.updateById(employeeId, update);
    };
}
