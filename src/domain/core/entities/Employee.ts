import {
    buildCommissionedEmployeeEntity,
    buildHourlyEmployeeEntity,
    CommissionedEmployee,
    CommissionedEmployeeEntity,
    EmployeeType,
    HourlyEmployee,
    HourlyEmployeeEntity,
    SalariedEmployee
} from "./employees";

export { EmployeeType, CommissionedEmployee, SalariedEmployee, HourlyEmployee } from "./employees";

export type Employee = HourlyEmployee | SalariedEmployee | CommissionedEmployee;
export type EmployeeEntity = HourlyEmployeeEntity | CommissionedEmployeeEntity;

export function buildEmployeeEntity(employee: HourlyEmployee): HourlyEmployeeEntity;
export function buildEmployeeEntity(employee: CommissionedEmployee): CommissionedEmployeeEntity;
export function buildEmployeeEntity(employee: Employee): EmployeeEntity {
    if (employee.work.type === EmployeeType.HOURLY) return buildHourlyEmployeeEntity(employee as HourlyEmployee);
    if (employee.work.type === EmployeeType.COMMISSIONED)
        return buildCommissionedEmployeeEntity(employee as CommissionedEmployee);
    throw new Error("not possible");
}
