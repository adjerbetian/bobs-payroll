import { ServiceCharge } from "../entities";
import { ServiceChargeRepository, UnionMemberRepository } from "../repositories";

interface Dependencies {
    serviceChargeRepository: ServiceChargeRepository;
    unionMemberRepository: UnionMemberRepository;
}

export type CreateServiceChargeAction = (serviceCharge: ServiceCharge) => Promise<void>;

export function buildCreateServiceChargeAction({
    serviceChargeRepository,
    unionMemberRepository
}: Dependencies): CreateServiceChargeAction {
    return async function(serviceCharge: ServiceCharge): Promise<void> {
        await assertUnionMemberExists(serviceCharge.memberId);
        await serviceChargeRepository.insert(serviceCharge);
    };

    async function assertUnionMemberExists(memberId: string): Promise<void> {
        await unionMemberRepository.fetchByMemberId(memberId);
    }
}
