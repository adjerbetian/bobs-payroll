import {
    buildCommissionedEmployee,
    buildHourlyEmployee,
    buildSalariedEmployee,
    CommissionedEmployee,
    Employee,
    EmployeeType,
    HourlyEmployee,
    SalariedEmployee
} from "../../domain";
import {
    CommissionedEmployeeDBModel,
    EmployeeDBModel,
    HourlyEmployeeDBModel,
    SalariedEmployeeDBModel
} from "../DBModels";
import { buildMapper, Mapper } from "./mapper";

type EmployeeMapper = Mapper<HourlyEmployee, HourlyEmployeeDBModel> &
    Mapper<SalariedEmployee, SalariedEmployeeDBModel> &
    Mapper<CommissionedEmployee, CommissionedEmployeeDBModel> &
    Mapper<Employee, EmployeeDBModel>;

export const employeeMapper: EmployeeMapper = buildMapper({
    toEntity(model: EmployeeDBModel): any {
        if (model.type === EmployeeType.HOURLY) {
            return buildHourlyEmployee(model);
        }
        if (model.type === EmployeeType.SALARIED) {
            return buildSalariedEmployee(model);
        }
        if (model.type === EmployeeType.COMMISSIONED) {
            return buildCommissionedEmployee(model);
        }
        throw new Error(`unknown type for employee model: ${model}`);
    },
    toDBModel(employee: Employee): any {
        if (employee.hasType(EmployeeType.HOURLY)) {
            return {
                id: employee.getId(),
                name: employee.getName(),
                address: employee.getAddress(),
                type: employee.getType(),
                hourlyRate: employee.getHourlyRate()
            };
        }
        if (employee.hasType(EmployeeType.SALARIED)) {
            return {
                id: employee.getId(),
                name: employee.getName(),
                address: employee.getAddress(),
                type: employee.getType(),
                salary: employee.getSalary()
            };
        }
        if (employee.hasType(EmployeeType.COMMISSIONED)) {
            return {
                id: employee.getId(),
                name: employee.getName(),
                address: employee.getAddress(),
                type: employee.getType(),
                salary: employee.getSalary(),
                commissionRate: employee.getCommissionRate()
            };
        }
        throw new Error(`unknown type for employee: ${employee}`);
    }
});
