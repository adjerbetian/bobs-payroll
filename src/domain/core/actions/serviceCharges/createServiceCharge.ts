import { ServiceChargeRepository, UnionMemberRepository } from "../../repositories";
import { CoreServiceChargeActions } from "../CoreActions";

interface Dependencies {
    serviceChargeRepository: ServiceChargeRepository;
    unionMemberRepository: UnionMemberRepository;
}

export function makeCreateServiceCharge({
    serviceChargeRepository,
    unionMemberRepository
}: Dependencies): CoreServiceChargeActions["createServiceCharge"] {
    return async function(serviceCharge) {
        await assertUnionMemberExists(serviceCharge.getMemberId());
        await serviceChargeRepository.insert(serviceCharge);
    };

    async function assertUnionMemberExists(memberId: string): Promise<void> {
        await unionMemberRepository.fetchByMemberId(memberId);
    }
}
