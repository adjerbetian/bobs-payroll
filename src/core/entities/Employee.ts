export enum EmployeeType {
    HOURLY = "hourly",
    SALARIED = "salaried",
    COMMISSIONED = "commissioned"
}

export interface Employee {
    id: number;
    name: string;
    address: string;
    type: EmployeeType;
    memberId: string | null;

    hourlyRate: number | null;
    monthlySalary: number | null;
    commissionRate: number | null;
}

export interface HourlyEmployee extends Employee {
    type: EmployeeType.HOURLY;
    hourlyRate: number;
}

export interface SalariedEmployee extends Employee {
    type: EmployeeType.SALARIED;
    monthlySalary: number;
}

export interface CommissionedEmployee extends Employee {
    type: EmployeeType.COMMISSIONED;
    monthlySalary: number;
    commissionRate: number;
}
