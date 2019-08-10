import { FilterQuery } from "mongodb";
import { ServiceCharge, ServiceChargeRepository } from "../core";
import { dbServiceCharge } from "./db";
import { cleanMongoEntity } from "./utils";

export const mongoServiceChargeRepository: ServiceChargeRepository = {
    async fetchAll(): Promise<ServiceCharge[]> {
        return findAllByQuery({});
    },
    async fetchAllOfMember(memberId: string): Promise<ServiceCharge[]> {
        return findAllByQuery({ memberId });
    },
    async insertOne(serviceCharge: ServiceCharge) {
        await dbServiceCharge.insertOne(serviceCharge);
        cleanMongoEntity(serviceCharge);
    }
};

async function findAllByQuery(query: FilterQuery<ServiceCharge>): Promise<ServiceCharge[]> {
    const serviceCharges = await dbServiceCharge.find(query).toArray();
    return serviceCharges.map(e => cleanMongoEntity(e));
}
