import { ServiceCharge, ServiceChargeRepository } from "../domain";
import { dbServiceCharges } from "./db";

export const mongoServiceChargeRepository: ServiceChargeRepository = {
    async fetchAll(): Promise<ServiceCharge[]> {
        return dbServiceCharges.fetchAll({});
    },
    async fetchAllOfMember(memberId: string): Promise<ServiceCharge[]> {
        return dbServiceCharges.fetchAll({ memberId });
    },
    async insertOne(serviceCharge: ServiceCharge) {
        await dbServiceCharges.insert(serviceCharge);
    }
};
