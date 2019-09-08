import { CoreDependencies, ServiceCharge } from "../../domain";
import { MongoDbAdapter } from "../databases";

export function makeMongoServiceChargeRepository(
    db: MongoDbAdapter<ServiceCharge>
): CoreDependencies["serviceChargeRepository"] {
    return {
        async fetchAll() {
            return db.fetchAll({});
        },
        async fetchAllOfMember(memberId) {
            return db.fetchAll({ memberId });
        },
        async insert(serviceCharge) {
            await db.insert(serviceCharge);
        }
    };
}
