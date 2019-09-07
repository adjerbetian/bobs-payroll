import { Employee } from "../../entities";
import { EmployeeRepository } from "../../repositories";
import { CoreEmployeeActions } from "../CoreActions";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function makeCreateEmployee({ employeeRepository }: Dependencies): CoreEmployeeActions["createEmployee"] {
    return async function(employee: Employee): Promise<void> {
        await employeeRepository.insert(employee);
    };
}
