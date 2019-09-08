import { EmployeeType } from "../entities";

export type EmployeeUpdate =
    | AddressUpdate
    | NameUpdate
    | HourlyTypeUpdate
    | SalariedTypeUpdate
    | CommissionedTypeUpdate;

type AddressUpdate = { address: string };
type NameUpdate = { name: string };
type HourlyTypeUpdate = { type: EmployeeType.HOURLY; hourlyRate: number };
type SalariedTypeUpdate = { type: EmployeeType.SALARIED; salary: number };
type CommissionedTypeUpdate = { type: EmployeeType.COMMISSIONED; salary: number; commissionRate: number };
