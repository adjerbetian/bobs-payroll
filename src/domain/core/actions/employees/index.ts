import { EmployeeRepository } from "../../repositories";
import { CoreEmployeeActions } from "./CoreEmployeeActions";
import { buildCreateEmployee } from "./createEmployee";
import { buildDeleteEmployee } from "./deleteEmployee";
import { buildUpdateEmployee } from "./updateEmployee";

export { CoreEmployeeActions } from "./CoreEmployeeActions";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function buildCoreEmployeeActions({ employeeRepository }: Dependencies): CoreEmployeeActions {
    return {
        createEmployee: buildCreateEmployee({ employeeRepository }),
        deleteEmployee: buildDeleteEmployee({ employeeRepository }),
        updateEmployee: buildUpdateEmployee({ employeeRepository })
    };
}
