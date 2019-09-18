import { buildServiceCharge, ServiceCharge } from "../../domain";
import { ServiceChargeDBModel } from "../DBModels";
import { buildMapper } from "./mapper";

export const serviceChargeMapper = buildMapper<ServiceCharge, ServiceChargeDBModel>({
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
