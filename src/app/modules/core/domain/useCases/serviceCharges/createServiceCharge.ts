import { buildServiceCharge } from "../../entities";
import { ServiceChargeRepository, UnionMemberRepository } from "../../repositories";
import { CoreServiceChargeUseCases } from "../CoreUseCases";

interface Dependencies {
    serviceChargeRepository: ServiceChargeRepository;
    unionMemberRepository: UnionMemberRepository;
}

export function makeCreateServiceCharge({
    serviceChargeRepository,
    unionMemberRepository
}: Dependencies): CoreServiceChargeUseCases["createServiceCharge"] {
    return async function(creationModel) {
        await assertUnionMemberExists(creationModel.memberId);

        const serviceCharge = buildServiceCharge(creationModel);
        await serviceChargeRepository.insert(serviceCharge);
    };

    async function assertUnionMemberExists(memberId: string): Promise<void> {
        await unionMemberRepository.fetchByMemberId(memberId);
    }
}
