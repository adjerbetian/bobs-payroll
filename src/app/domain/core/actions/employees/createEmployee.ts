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
import { CoreEmployeeActions } from "../CoreActions";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function makeCreateEmployee({ employeeRepository }: Dependencies): CoreEmployeeActions["createEmployee"] {
    return async function(creationModel) {
        const employee = await buildEmployee(creationModel);
        await employeeRepository.insert(employee);
    };

    async function buildEmployee(creationModel: EmployeeCreationModel): Promise<Employee> {
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
