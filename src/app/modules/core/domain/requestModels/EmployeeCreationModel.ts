import { EmployeeType } from "../entities";

export type EmployeeCreationModel =
    | HourlyEmployeeCreationModel
    | SalariedEmployeeCreationModel
    | CommissionedEmployeeCreationModel;

export interface HourlyEmployeeCreationModel extends CommonEmployeeCreationModel {
    type: EmployeeType.HOURLY;
    hourlyRate: number;
}
export interface SalariedEmployeeCreationModel extends CommonEmployeeCreationModel {
    type: EmployeeType.SALARIED;
    salary: number;
}
export interface CommissionedEmployeeCreationModel extends CommonEmployeeCreationModel {
    type: EmployeeType.COMMISSIONED;
    salary: number;
    commissionRate: number;
}

interface CommonEmployeeCreationModel {
    id: number;
    name: string;
    address: string;
    type: EmployeeType;
}
