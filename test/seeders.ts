import { Employee, mongoEmployeeRepository } from "../src";
import {
    generateCommissionedEmployee,
    generateHourlyEmployee,
    generateSalariedEmployee,
    generateUnionEmployee
} from "./generators";

type PEmployee = Partial<Employee>;

export async function seedHourlyEmployee(args: PEmployee = {}): Promise<Employee> {
    const employee = generateHourlyEmployee(args);
    await mongoEmployeeRepository.insertOne(employee);
    return employee;
}

export async function seedSalariedEmployee(args: PEmployee = {}): Promise<Employee> {
    const employee = generateSalariedEmployee(args);
    await mongoEmployeeRepository.insertOne(employee);
    return employee;
}

export async function seedCommissionedEmployee(args: PEmployee = {}): Promise<Employee> {
    const employee = generateCommissionedEmployee(args);
    await mongoEmployeeRepository.insertOne(employee);
    return employee;
}

export async function seedUnionEmployee(args: PEmployee = {}): Promise<Employee> {
    const employee = generateUnionEmployee(args);
    await mongoEmployeeRepository.insertOne(employee);
    return employee;
}
