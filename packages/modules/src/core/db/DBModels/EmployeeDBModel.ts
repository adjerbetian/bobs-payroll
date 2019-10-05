import { MongoModel } from "@bobs-payroll/mongo";
import { EmployeeType } from "../../domain";

export type EmployeeDBModel = HourlyEmployeeDBModel | SalariedEmployeeDBModel | CommissionedEmployeeDBModel;

interface CommonEmployeeDBModel extends MongoModel {
    id: number;
    name: string;
    address: string;
    type: EmployeeType;
}

export interface HourlyEmployeeDBModel extends CommonEmployeeDBModel {
    type: EmployeeType.HOURLY;
    hourlyRate: number;
}

export interface SalariedEmployeeDBModel extends CommonEmployeeDBModel {
    type: EmployeeType.SALARIED;
    salary: number;
}

export interface CommissionedEmployeeDBModel extends CommonEmployeeDBModel {
    type: EmployeeType.COMMISSIONED;
    salary: number;
    commissionRate: number;
}
