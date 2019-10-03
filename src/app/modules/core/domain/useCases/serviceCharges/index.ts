import { ServiceChargeRepository, UnionMemberRepository } from "../../repositories";
import { CoreServiceChargeUseCases } from "../CoreUseCases";
import { makeCreateServiceCharge } from "./createServiceCharge";

interface Dependencies {
    unionMemberRepository: UnionMemberRepository;
    serviceChargeRepository: ServiceChargeRepository;
}

export function makeCoreServiceChargesUseCases({
    unionMemberRepository,
    serviceChargeRepository
}: Dependencies): CoreServiceChargeUseCases {
    return {
        createServiceCharge: makeCreateServiceCharge({ unionMemberRepository, serviceChargeRepository })
    };
}
export { CoreServiceChargeUseCases } from "../CoreUseCases";
