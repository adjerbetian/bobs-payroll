import { ServiceChargeRepository, UnionMembershipRepository } from "../../repositories";
import { CoreServiceChargeUseCases } from "../CoreUseCases";
import { makeCreateServiceCharge } from "./createServiceCharge";

interface Dependencies {
    unionMembershipRepository: UnionMembershipRepository;
    serviceChargeRepository: ServiceChargeRepository;
}

export function makeCoreServiceChargesUseCases({
    unionMembershipRepository,
    serviceChargeRepository
}: Dependencies): CoreServiceChargeUseCases {
    return {
        createServiceCharge: makeCreateServiceCharge({ unionMembershipRepository, serviceChargeRepository })
    };
}
export { CoreServiceChargeUseCases } from "../CoreUseCases";
