import { MongoModel } from "./MongoModel";

export interface ServiceChargeDBModel extends MongoModel {
    memberId: string;
    amount: number;
}
