import { ServiceChargeRepository, UnionMemberRepository } from "../../repositories";
import { CoreServiceChargeActions } from "./CoreServiceChargeActions";
import { buildCreateServiceCharge } from "./createServiceCharge";

export { CoreServiceChargeActions } from "./CoreServiceChargeActions";

interface Dependencies {
    unionMemberRepository: UnionMemberRepository;
    serviceChargeRepository: ServiceChargeRepository;
}

export function buildCoreServiceChargesActions({
    unionMemberRepository,
    serviceChargeRepository
}: Dependencies): CoreServiceChargeActions {
    return {
        createServiceCharge: buildCreateServiceCharge({ unionMemberRepository, serviceChargeRepository })
    };
}
