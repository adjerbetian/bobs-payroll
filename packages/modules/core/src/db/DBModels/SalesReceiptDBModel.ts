import { MongoModel } from "@payroll/mongo";

export interface SalesReceiptDBModel extends MongoModel {
    employeeId: number;
    date: string;
    amount: number;
}
