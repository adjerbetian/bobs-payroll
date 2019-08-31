import { CoreActionsDependencies, ServiceCharge } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";

export function buildMongoServiceChargeRepository(
    db: MongoDbAdapter<ServiceCharge>
): CoreActionsDependencies["serviceChargeRepository"] {
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
