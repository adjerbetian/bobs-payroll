import { Employee, mongoEmployeeRepository } from "../src";
import {
    generateCommissionedSalaryEmployee,
    generateHourlyEmployee,
    generateMonthlySalaryEmployee,
    generateUnionEmployee
} from "./generators";

type PEmployee = Partial<Employee>;

export async function seedHourlyEmployee(args: PEmployee = {}): Promise<Employee> {
    const employee = generateHourlyEmployee(args);
    await mongoEmployeeRepository.insertOne(employee);
    return employee;
}

export async function seedMonthlySalaryEmployee(args: PEmployee = {}): Promise<Employee> {
    const employee = generateMonthlySalaryEmployee(args);
    await mongoEmployeeRepository.insertOne(employee);
    return employee;
}

export async function seedCommissionedEmployee(args: PEmployee = {}): Promise<Employee> {
    const employee = generateCommissionedSalaryEmployee(args);
    await mongoEmployeeRepository.insertOne(employee);
    return employee;
}

export async function seedUnionEmployee(args: PEmployee = {}): Promise<Employee> {
    const employee = generateUnionEmployee(args);
    await mongoEmployeeRepository.insertOne(employee);
    return employee;
}
