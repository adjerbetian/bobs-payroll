import { UnionMemberRepository } from "../repositories";

interface Dependencies {
    unionMemberRepository: UnionMemberRepository;
}

export type RemoveEmployeeFromUnionAction = (employeeId: number) => Promise<void>;

export function buildRemoveEmployeeFromUnionAction({
    unionMemberRepository
}: Dependencies): RemoveEmployeeFromUnionAction {
    return async function(employeeId: number): Promise<void> {
        await unionMemberRepository.deleteByEmployeeId(employeeId);
    };
}
