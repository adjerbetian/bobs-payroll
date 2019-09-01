import { EmployeeRepository } from "../../repositories";
import { CoreEmployeeActions } from "../CoreActions";
import { buildCreateEmployee } from "./createEmployee";
import { buildDeleteEmployee } from "./deleteEmployee";
import { buildUpdateEmployee } from "./updateEmployee";

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
export { CoreEmployeeActions } from "../CoreActions";
