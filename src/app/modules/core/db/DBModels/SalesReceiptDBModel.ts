import { MongoModel } from "../../../../mongo";

export interface SalesReceiptDBModel extends MongoModel {
    employeeId: number;
    date: string;
    amount: number;
}
