import { MongoModel } from "@bobs-payroll/mongo";

export interface ServiceChargeDBModel extends MongoModel {
    memberId: string;
    amount: number;
}
