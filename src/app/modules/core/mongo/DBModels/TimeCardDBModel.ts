import { MongoModel } from "../../../../mongo";

export interface TimeCardDBModel extends MongoModel {
    employeeId: number;
    date: string;
    hours: number;
}
