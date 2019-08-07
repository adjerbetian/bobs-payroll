import { Employee, mongoEmployeeRepository } from "../src";
import {
    generateCommissionedSalaryEmployee,
    generateHourlyRateEmployee,
    generateMonthlySalaryEmployee,
    generateUnionEmployee
} from "./generators";

type PEmployee = Partial<Employee>;

export async function createHourlyRateEmployee(args: PEmployee = {}): Promise<Employee> {
    const employee = generateHourlyRateEmployee(args);
    await mongoEmployeeRepository.insertOne(employee);
    return employee;
}

export async function createMonthlySalaryEmployee(args: PEmployee = {}): Promise<Employee> {
    const employee = generateMonthlySalaryEmployee(args);
    await mongoEmployeeRepository.insertOne(employee);
    return employee;
}

export async function createCommissionedEmployee(args: PEmployee = {}): Promise<Employee> {
    const employee = generateCommissionedSalaryEmployee(args);
    await mongoEmployeeRepository.insertOne(employee);
    return employee;
}

export async function createUnionEmployee(args: PEmployee = {}): Promise<Employee> {
    const employee = generateUnionEmployee(args);
    await mongoEmployeeRepository.insertOne(employee);
    return employee;
}
