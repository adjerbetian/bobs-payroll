import { CoreDependencies } from "../../domain";
import { MongoDbAdapter } from "../databases";
import { ServiceChargeDBModel } from "../DBModels";
import { serviceChargeMapper } from "../mappers";

export function makeMongoServiceChargeRepository(
    db: MongoDbAdapter<ServiceChargeDBModel>
): CoreDependencies["serviceChargeRepository"] {
    return {
        async fetchAll() {
            const dbModels = await db.fetchAll({});
            return serviceChargeMapper.toEntities(dbModels);
        },
        async fetchAllOfMember(memberId) {
            const dbModels = await db.fetchAll({ memberId });
            return serviceChargeMapper.toEntities(dbModels);
        },
        async insert(serviceCharge) {
            await db.insert(serviceChargeMapper.toDBModel(serviceCharge));
        }
    };
}
