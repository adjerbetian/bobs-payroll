import { MongoModel } from "@infra/mongo";

export interface SalesReceiptDBModel extends MongoModel {
    employeeId: number;
    date: string;
    amount: number;
}
