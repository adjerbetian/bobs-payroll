import { ServiceCharge, ServiceChargeRepository } from "../core";
import { dbServiceCharge } from "./db";
import { cleanMongoEntity } from "./utils";

export const mongoServiceChargeRepository: ServiceChargeRepository = {
    async fetchAll(): Promise<ServiceCharge[]> {
        return [];
    },
    async fetchAllOfMember(memberId: string): Promise<ServiceCharge[]> {
        const timeCards = await dbServiceCharge.find({ memberId }).toArray();
        return timeCards.map(e => cleanMongoEntity(e));
    },
    async insertOne(serviceCharge: ServiceCharge) {
        await dbServiceCharge.insertOne(serviceCharge);
        cleanMongoEntity(serviceCharge);
    }
};
