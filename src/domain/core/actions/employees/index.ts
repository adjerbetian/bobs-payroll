import { EmployeeRepository } from "../../repositories";
import { CoreEmployeeActions } from "../CoreActions";
import { buildCreateEmployee } from "./createEmployee";
import { buildDeleteEmployee } from "./deleteEmployee";
import { buildFetchAllCommissioned } from "./fetchAllCommissioned";
import { buildFetchAllHourly } from "./fetchAllHourly";
import { buildFetchAllSalaried } from "./fetchAllSalaried";
import { buildUpdateEmployee } from "./updateEmployee";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function buildCoreEmployeeActions({ employeeRepository }: Dependencies): CoreEmployeeActions {
    return {
        createEmployee: buildCreateEmployee({ employeeRepository }),
        deleteEmployee: buildDeleteEmployee({ employeeRepository }),
        updateEmployee: buildUpdateEmployee({ employeeRepository }),
        fetchAllHourly: buildFetchAllHourly({ employeeRepository }),
        fetchAllSalaried: buildFetchAllSalaried({ employeeRepository }),
        fetchAllCommissioned: buildFetchAllCommissioned({ employeeRepository })
    };
}
export { CoreEmployeeActions } from "../CoreActions";
