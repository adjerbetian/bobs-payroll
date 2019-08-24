import { CommissionedEmployee, HourlyEmployee, mongoEmployeeRepository, SalariedEmployee } from "../src";
import {
    generateCommissionedEmployee,
    generateHourlyEmployee,
    generateSalariedEmployee,
    generateUnionEmployee
} from "./generators";

export async function seedHourlyEmployee(args: Partial<HourlyEmployee> = {}): Promise<HourlyEmployee> {
    const employee = generateHourlyEmployee(args);
    await mongoEmployeeRepository.insertOne(employee);
    return employee;
}

export async function seedSalariedEmployee(args: Partial<SalariedEmployee> = {}): Promise<SalariedEmployee> {
    const employee = generateSalariedEmployee(args);
    await mongoEmployeeRepository.insertOne(employee);
    return employee;
}

export async function seedCommissionedEmployee(
    args: Partial<CommissionedEmployee> = {}
): Promise<CommissionedEmployee> {
    const employee = generateCommissionedEmployee(args);
    await mongoEmployeeRepository.insertOne(employee);
    return employee;
}

export async function seedUnionEmployee(args: Partial<HourlyEmployee> = {}): Promise<HourlyEmployee> {
    const employee = generateUnionEmployee(args);
    await mongoEmployeeRepository.insertOne(employee);
    return employee;
}
