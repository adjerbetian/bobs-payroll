import { CommonEmployee, EmployeeType } from "./common";

export interface CommissionedEmployee extends CommonEmployee {
    work: {
        type: EmployeeType.COMMISSIONED;
        monthlySalary: number;
        commissionRate: number;
    };
}
