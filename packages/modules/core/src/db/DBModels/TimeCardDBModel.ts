import { MongoModel } from "@payroll/mongo";

export interface TimeCardDBModel extends MongoModel {
    employeeId: number;
    date: string;
    hours: number;
}
