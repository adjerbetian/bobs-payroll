import { buildServiceCharge, ServiceCharge } from "../../domain";
import { buildMapper } from "./mapper";

export const serviceChargeMapper = buildMapper<ServiceCharge>({
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
