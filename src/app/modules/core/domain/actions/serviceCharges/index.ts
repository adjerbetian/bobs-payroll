import { ServiceChargeRepository, UnionMemberRepository } from "../../repositories";
import { CoreServiceChargeActions } from "../CoreActions";
import { makeCreateServiceCharge } from "./createServiceCharge";

interface Dependencies {
    unionMemberRepository: UnionMemberRepository;
    serviceChargeRepository: ServiceChargeRepository;
}

export function makeCoreServiceChargesActions({
    unionMemberRepository,
    serviceChargeRepository
}: Dependencies): CoreServiceChargeActions {
    return {
        createServiceCharge: makeCreateServiceCharge({ unionMemberRepository, serviceChargeRepository })
    };
}
export { CoreServiceChargeActions } from "../CoreActions";
