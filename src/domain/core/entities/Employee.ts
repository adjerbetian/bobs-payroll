import { CommissionedEmployee, EmployeeType, HourlyEmployee, SalariedEmployee } from "./employees";

export { EmployeeType, CommissionedEmployee, SalariedEmployee, HourlyEmployee } from "./employees";

export type Employee = HourlyEmployee | SalariedEmployee | CommissionedEmployee;
