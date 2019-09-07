import { EmployeeRepository } from "../../repositories";
import { CoreEmployeeActions } from "../CoreActions";
import { makeCreateEmployee } from "./createEmployee";
import { makeDeleteEmployee } from "./deleteEmployee";
import { makeFetchAllCommissionedEmployees } from "./fetchAllCommissionedEmployees";
import { makeFetchAllHourlyEmployees } from "./fetchAllHourlyEmployees";
import { makeFetchAllSalariedEmployees } from "./fetchAllSalariedEmployees";
import { makeUpdateEmployee } from "./updateEmployee";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function makeCoreEmployeeActions({ employeeRepository }: Dependencies): CoreEmployeeActions {
    return {
        createEmployee: makeCreateEmployee({ employeeRepository }),
        deleteEmployee: makeDeleteEmployee({ employeeRepository }),
        updateEmployee: makeUpdateEmployee({ employeeRepository }),
        fetchAllHourlyEmployees: makeFetchAllHourlyEmployees({ employeeRepository }),
        fetchAllSalariedEmployees: makeFetchAllSalariedEmployees({ employeeRepository }),
        fetchAllCommissionedEmployees: makeFetchAllCommissionedEmployees({ employeeRepository })
    };
}
export { CoreEmployeeActions } from "../CoreActions";
