import { buildServiceCharge } from "../../entities";
import { ServiceChargeRepository, UnionMembershipRepository } from "../../repositories";
import { CoreServiceChargeUseCases } from "../CoreUseCases";

interface Dependencies {
    serviceChargeRepository: ServiceChargeRepository;
    unionMembershipRepository: UnionMembershipRepository;
}

export function makeCreateServiceCharge({
    serviceChargeRepository,
    unionMembershipRepository
}: Dependencies): CoreServiceChargeUseCases["createServiceCharge"] {
    return async function(creationModel) {
        await assertUnionMembershipExists(creationModel.memberId);

        const serviceCharge = buildServiceCharge(creationModel);
        await serviceChargeRepository.insert(serviceCharge);
    };

    async function assertUnionMembershipExists(memberId: string): Promise<void> {
        await unionMembershipRepository.fetchByMemberId(memberId);
    }
}
