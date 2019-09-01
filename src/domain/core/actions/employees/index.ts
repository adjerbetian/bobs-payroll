import { EmployeeRepository } from "../../repositories";
import { CoreEmployeeActions } from "../CoreActions";
import { buildCreateEmployee } from "./createEmployee";
import { buildDeleteEmployee } from "./deleteEmployee";
import { buildFetchAllCommissionedEmployees } from "./fetchAllCommissionedEmployees";
import { buildFetchAllHourlyEmployees } from "./fetchAllHourlyEmployees";
import { buildFetchAllSalariedEmployees } from "./fetchAllSalariedEmployees";
import { buildUpdateEmployee } from "./updateEmployee";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function buildCoreEmployeeActions({ employeeRepository }: Dependencies): CoreEmployeeActions {
    return {
        createEmployee: buildCreateEmployee({ employeeRepository }),
        deleteEmployee: buildDeleteEmployee({ employeeRepository }),
        updateEmployee: buildUpdateEmployee({ employeeRepository }),
        fetchAllHourlyEmployees: buildFetchAllHourlyEmployees({ employeeRepository }),
        fetchAllSalariedEmployees: buildFetchAllSalariedEmployees({ employeeRepository }),
        fetchAllCommissionedEmployees: buildFetchAllCommissionedEmployees({ employeeRepository })
    };
}
export { CoreEmployeeActions } from "../CoreActions";
