import { EmployeeRepository } from "../../repositories";
import { CoreEmployeeUseCases } from "../CoreUseCases";
import { makeCreateEmployee } from "./createEmployee";
import { makeDeleteEmployee } from "./deleteEmployee";
import { makeFetchAllCommissionedEmployees } from "./fetchAllCommissionedEmployees";
import { makeFetchAllHourlyEmployees } from "./fetchAllHourlyEmployees";
import { makeFetchAllSalariedEmployees } from "./fetchAllSalariedEmployees";
import { makeUpdateEmployee } from "./updateEmployee";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function makeCoreEmployeeUseCases({ employeeRepository }: Dependencies): CoreEmployeeUseCases {
    return {
        createEmployee: makeCreateEmployee({ employeeRepository }),
        deleteEmployee: makeDeleteEmployee({ employeeRepository }),
        updateEmployee: makeUpdateEmployee({ employeeRepository }),
        fetchAllHourlyEmployees: makeFetchAllHourlyEmployees({ employeeRepository }),
        fetchAllSalariedEmployees: makeFetchAllSalariedEmployees({ employeeRepository }),
        fetchAllCommissionedEmployees: makeFetchAllCommissionedEmployees({ employeeRepository })
    };
}
export { CoreEmployeeUseCases } from "../CoreUseCases";
