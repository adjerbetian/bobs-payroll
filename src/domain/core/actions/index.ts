import { EmployeeRepository, TimeCardRepository } from "../repositories";
import { buildDeleteEmployeeAction, DeleteEmployeeAction } from "./deleteEmployee";
import { buildCreateTimeCardAction, CreateTimeCardAction } from "./createTimeCard";

export { DeleteEmployeeAction } from "./deleteEmployee";
export { CreateTimeCardAction } from "./createTimeCard";

export interface Actions {
    deleteEmployee: DeleteEmployeeAction;
    createTimeCard: CreateTimeCardAction;
}

export interface ActionsDependencies {
    employeeRepository: EmployeeRepository;
    timeCardRepository: TimeCardRepository;
}

export function buildActions({ employeeRepository, timeCardRepository }: ActionsDependencies): Actions {
    return {
        deleteEmployee: buildDeleteEmployeeAction({ employeeRepository }),
        createTimeCard: buildCreateTimeCardAction({ employeeRepository, timeCardRepository })
    };
}
