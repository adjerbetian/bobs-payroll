import { EmployeeRepository } from "../../repositories";
import { CoreEmployeeActions } from "../CoreActions";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function makeUpdateEmployee({ employeeRepository }: Dependencies): CoreEmployeeActions["updateEmployee"] {
    return async function(employeeId, update) {
        await employeeRepository.updateById(employeeId, update);
    };
}
