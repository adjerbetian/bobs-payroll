import { ServiceCharge } from "../../entities";
import { ServiceChargeRepository, UnionMemberRepository } from "../../repositories";
import { CoreServiceChargeActions } from "../CoreActions";

interface Dependencies {
    serviceChargeRepository: ServiceChargeRepository;
    unionMemberRepository: UnionMemberRepository;
}

export function buildCreateServiceCharge({
    serviceChargeRepository,
    unionMemberRepository
}: Dependencies): CoreServiceChargeActions["createServiceCharge"] {
    return async function(serviceCharge: ServiceCharge): Promise<void> {
        await assertUnionMemberExists(serviceCharge.memberId);
        await serviceChargeRepository.insert(serviceCharge);
    };

    async function assertUnionMemberExists(memberId: string): Promise<void> {
        await unionMemberRepository.fetchByMemberId(memberId);
    }
}
