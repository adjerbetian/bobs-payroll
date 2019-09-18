import { MongoModel } from "./MongoModel";

export interface SalesReceiptDBModel extends MongoModel {
    employeeId: number;
    date: string;
    amount: number;
}
