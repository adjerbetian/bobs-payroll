import { MongoModel } from "@infra/mongo";

export interface ServiceChargeDBModel extends MongoModel {
    memberId: string;
    amount: number;
}
