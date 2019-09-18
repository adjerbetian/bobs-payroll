import { CoreDependencies, ServiceCharge } from "../../domain";
import { MongoEntity } from "../databases";
import { ServiceChargeDBModel } from "../DBModels";

export function makeMongoServiceChargeRepository(
    db: MongoEntity<ServiceCharge, ServiceChargeDBModel>
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
