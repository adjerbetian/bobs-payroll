import { EmployeeRepository } from "../../repositories";
import { CoreEmployeeActions } from "../CoreActions";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function makeDeleteEmployee({ employeeRepository }: Dependencies): CoreEmployeeActions["deleteEmployee"] {
    return async function deleteEmployee(employeeId) {
        await employeeRepository.deleteById(employeeId);
    };
}
