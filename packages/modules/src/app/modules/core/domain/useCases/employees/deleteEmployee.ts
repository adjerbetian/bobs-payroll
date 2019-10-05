import { EmployeeRepository } from "../../repositories";
import { CoreEmployeeUseCases } from "../CoreUseCases";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function makeDeleteEmployee({ employeeRepository }: Dependencies): CoreEmployeeUseCases["deleteEmployee"] {
    return async function deleteEmployee(employeeId) {
        await employeeRepository.deleteById(employeeId);
    };
}
