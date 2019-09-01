import { ServiceChargeRepository, UnionMemberRepository } from "../../repositories";
import { CoreServiceChargeActions } from "../CoreActions";
import { buildCreateServiceCharge } from "./createServiceCharge";

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
export { CoreServiceChargeActions } from "../CoreActions";
