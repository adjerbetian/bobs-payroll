import { MongoModel } from "./MongoModel";

export interface TimeCardDBModel extends MongoModel {
    employeeId: number;
    date: string;
    hours: number;
}
