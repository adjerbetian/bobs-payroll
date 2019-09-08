import { Entity } from "./Entity";
import { SalesReceipt } from "./SalesReceipt";
import { TimeCard } from "./TimeCard";

export type Employee = HourlyEmployee | SalariedEmployee | CommissionedEmployee;

export interface CommonEmployee {
    getId(): number;
    getName(): string;
    getAddress(): string;
    getType(): EmployeeType;
    hasType(type: EmployeeType.HOURLY): this is HourlyEmployee;
    hasType(type: EmployeeType.SALARIED): this is SalariedEmployee;
    hasType(type: EmployeeType.COMMISSIONED): this is CommissionedEmployee;
}

export interface HourlyEmployee extends CommonEmployee, Entity {
    getType(): EmployeeType.HOURLY;
    getHourlyRate(): number;
    computePayAmount(timeCards: TimeCard[]): number;
}

export interface SalariedEmployee extends CommonEmployee, Entity {
    getType(): EmployeeType.SALARIED;
    getSalary(): number;
}

export interface CommissionedEmployee extends CommonEmployee, Entity {
    getType(): EmployeeType.COMMISSIONED;
    getSalary(): number;
    getCommissionRate(): number;
    computeCommissionedSalary(salesReceipts: SalesReceipt[]): number;
}

export enum EmployeeType {
    HOURLY = "hourly",
    SALARIED = "salaried",
    COMMISSIONED = "commissioned"
}
