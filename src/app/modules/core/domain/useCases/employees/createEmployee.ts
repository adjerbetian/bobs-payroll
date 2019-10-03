import {
    buildCommissionedEmployee,
    buildHourlyEmployee,
    buildSalariedEmployee,
    Employee,
    EmployeeType
} from "../../entities";
import { InvalidObject } from "../../errors";
import { EmployeeRepository } from "../../repositories";
import { EmployeeCreationModel } from "../../requestModels";
import { CoreEmployeeUseCases } from "../CoreUseCases";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function makeCreateEmployee({ employeeRepository }: Dependencies): CoreEmployeeUseCases["createEmployee"] {
    return async function(creationModel) {
        const employee = buildEmployee(creationModel);
        await employeeRepository.insert(employee);
    };

    function buildEmployee(creationModel: EmployeeCreationModel): Employee {
        if (creationModel.type === EmployeeType.HOURLY) {
            return buildHourlyEmployee(creationModel);
        }
        if (creationModel.type === EmployeeType.SALARIED) {
            return buildSalariedEmployee(creationModel);
        }
        if (creationModel.type === EmployeeType.COMMISSIONED) {
            return buildCommissionedEmployee(creationModel);
        }
        throw new InvalidObject(creationModel);
    }
}
