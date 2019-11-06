import { MongoModel } from "@infra/mongo";

export interface TimeCardDBModel extends MongoModel {
    employeeId: number;
    date: string;
    hours: number;
}
