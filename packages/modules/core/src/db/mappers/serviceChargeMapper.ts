import { buildMapper } from "@infra/mongo";
import { buildServiceCharge, ServiceCharge } from "../../domain";
import { ServiceChargeDBModel } from "../DBModels";

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
