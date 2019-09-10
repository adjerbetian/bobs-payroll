import { buildServiceCharge, CoreDependencies, ServiceCharge } from "../../domain";
import { MongoDbAdapter } from "../databases";
import { ServiceChargeDBModel } from "../DBModels";

export function makeMongoServiceChargeRepository(
    db: MongoDbAdapter<ServiceChargeDBModel>
): CoreDependencies["serviceChargeRepository"] {
    return {
        async fetchAll() {
            const dbModels = await db.fetchAll({});
            return toEntities(dbModels);
        },
        async fetchAllOfMember(memberId) {
            const dbModels = await db.fetchAll({ memberId });
            return toEntities(dbModels);
        },
        async insert(serviceCharge) {
            await db.insert(toDBModel(serviceCharge));
        }
    };
}

function toDBModel(serviceCharge: ServiceCharge): ServiceChargeDBModel {
    return {
        memberId: serviceCharge.getMemberId(),
        amount: serviceCharge.getAmount()
    };
}
function toEntities(serviceChargeDBModels: ServiceChargeDBModel[]): ServiceCharge[] {
    return serviceChargeDBModels.map(model => toEntity(model));
}
function toEntity(serviceChargeDBModel: ServiceChargeDBModel): ServiceCharge {
    return buildServiceCharge(serviceChargeDBModel);
}
