import { EmployeeType } from "../entities";

export type EmployeeCreationModel =
    | HourlyEmployeeCreationModel
    | SalariedEmployeeCreationModel
    | CommissionedEmployeeCreationModel;

export interface HourlyEmployeeCreationModel extends CommonEmployeeCreationModel {
    readonly type: EmployeeType.HOURLY;
    readonly hourlyRate: number;
}
export interface SalariedEmployeeCreationModel extends CommonEmployeeCreationModel {
    readonly type: EmployeeType.SALARIED;
    readonly salary: number;
}
export interface CommissionedEmployeeCreationModel extends CommonEmployeeCreationModel {
    readonly type: EmployeeType.COMMISSIONED;
    readonly salary: number;
    readonly commissionRate: number;
}

interface CommonEmployeeCreationModel {
    readonly id: number;
    readonly name: string;
    readonly address: string;
    readonly type: EmployeeType;
}
