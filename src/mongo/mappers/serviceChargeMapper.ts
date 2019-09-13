import { buildServiceCharge, ServiceCharge } from "../../domain";
import { ServiceChargeDBModel } from "../DBModels";
import { buildMapper, Mapper } from "./mapper";

type ServiceChargeMapper = Mapper<ServiceChargeDBModel, ServiceCharge>;

export const serviceChargeMapper: ServiceChargeMapper = buildMapper({
    toEntity(model) {
        return buildServiceCharge({
            memberId: model.memberId,
            amount: model.amount
        });
    },
    toDBModel(entity) {
        return {
            memberId: entity.getMemberId(),
            amount: entity.getAmount()
        };
    }
});
