import { EmployeeType } from "./EmployeeType";

export interface CommonEmployee {
    id: number;
    name: string;
    address: string;
    work: {
        type: EmployeeType;
    };
}
