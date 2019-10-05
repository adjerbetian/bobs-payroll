import { MongoModel } from "@bobs-payroll/mongo";

export interface SalesReceiptDBModel extends MongoModel {
    employeeId: number;
    date: string;
    amount: number;
}
