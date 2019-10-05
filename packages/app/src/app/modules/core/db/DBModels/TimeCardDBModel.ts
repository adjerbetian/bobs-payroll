import { MongoModel } from "@bobs-payroll/mongo";

export interface TimeCardDBModel extends MongoModel {
    employeeId: number;
    date: string;
    hours: number;
}
