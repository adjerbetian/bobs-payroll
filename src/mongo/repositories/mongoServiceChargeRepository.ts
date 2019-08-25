import { ServiceCharge, ServiceChargeRepository } from "../../domain";
import { dbServiceCharges } from "../db";
import { MongoDbAdapter } from "../mongoDbAdapter";

export const mongoServiceChargeRepository: ServiceChargeRepository = buildMongoServiceChargeRepository(
    dbServiceCharges
);

export function buildMongoServiceChargeRepository(db: MongoDbAdapter<ServiceCharge>): ServiceChargeRepository {
    return {
        async fetchAll(): Promise<ServiceCharge[]> {
            return db.fetchAll({});
        },
        async fetchAllOfMember(memberId: string): Promise<ServiceCharge[]> {
            return db.fetchAll({ memberId });
        },
        async insert(serviceCharge: ServiceCharge) {
            await db.insert(serviceCharge);
        }
    };
}
