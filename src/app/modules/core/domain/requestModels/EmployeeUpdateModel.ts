import { EmployeeType } from "../entities";

export type EmployeeUpdateModel =
    | AddressUpdate
    | NameUpdate
    | HourlyTypeUpdate
    | SalariedTypeUpdate
    | CommissionedTypeUpdate;

interface AddressUpdate {
    address: string;
}
interface NameUpdate {
    name: string;
}
interface HourlyTypeUpdate {
    type: EmployeeType.HOURLY;
    hourlyRate: number;
}
interface SalariedTypeUpdate {
    type: EmployeeType.SALARIED;
    salary: number;
}
interface CommissionedTypeUpdate {
    type: EmployeeType.COMMISSIONED;
    salary: number;
    commissionRate: number;
}
