import { EmployeeRepository } from "../../repositories";
import { CoreEmployeeUseCases } from "../CoreUseCases";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function makeUpdateEmployee({ employeeRepository }: Dependencies): CoreEmployeeUseCases["updateEmployee"] {
    return async function(employeeId, update) {
        await employeeRepository.updateById(employeeId, update);
    };
}
