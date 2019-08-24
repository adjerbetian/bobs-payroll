export type Employee = HourlyEmployee | SalariedEmployee | CommissionedEmployee;

export interface HourlyEmployee extends CommonEmployee {
    type: EmployeeType.HOURLY;
    hourlyRate: number;
}

export interface SalariedEmployee extends CommonEmployee {
    type: EmployeeType.SALARIED;
    monthlySalary: number;
}

export interface CommissionedEmployee extends CommonEmployee {
    type: EmployeeType.COMMISSIONED;
    monthlySalary: number;
    commissionRate: number;
}

interface CommonEmployee {
    id: number;
    name: string;
    address: string;
    type: EmployeeType;
    memberId: string | null;
}

export enum EmployeeType {
    HOURLY = "hourly",
    SALARIED = "salaried",
    COMMISSIONED = "commissioned"
}