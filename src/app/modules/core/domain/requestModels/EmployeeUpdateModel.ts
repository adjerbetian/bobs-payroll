import { EmployeeType } from "../entities";

export type EmployeeUpdateModel =
    | AddressUpdate
    | NameUpdate
    | HourlyTypeUpdate
    | SalariedTypeUpdate
    | CommissionedTypeUpdate;

interface AddressUpdate {
    readonly address: string;
}
interface NameUpdate {
    readonly name: string;
}
interface HourlyTypeUpdate {
    readonly type: EmployeeType.HOURLY;
    readonly hourlyRate: number;
}
interface SalariedTypeUpdate {
    readonly type: EmployeeType.SALARIED;
    readonly salary: number;
}
interface CommissionedTypeUpdate {
    readonly type: EmployeeType.COMMISSIONED;
    readonly salary: number;
    readonly commissionRate: number;
}
