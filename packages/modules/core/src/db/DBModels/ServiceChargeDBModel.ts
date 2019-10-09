import { MongoModel } from "@payroll/mongo";

export interface ServiceChargeDBModel extends MongoModel {
    memberId: string;
    amount: number;
}
