import { EmployeeRepository } from "../repositories";
import { buildDeleteEmployeeAction, DeleteEmployeeAction } from "./deleteEmployee";

export { DeleteEmployeeAction } from "./deleteEmployee";

export interface Actions {
    deleteEmployee: DeleteEmployeeAction;
}

export interface ActionsDependencies {
    employeeRepository: EmployeeRepository;
}

export function buildActions({ employeeRepository }: ActionsDependencies): Actions {
    return {
        deleteEmployee: buildDeleteEmployeeAction({ employeeRepository })
    };
}
