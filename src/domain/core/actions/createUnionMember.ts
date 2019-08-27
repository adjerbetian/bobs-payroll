import { UnionMember } from "../entities";
import { EmployeeRepository, UnionMemberRepository } from "../repositories";

interface Dependencies {
    unionMemberRepository: UnionMemberRepository;
    employeeRepository: EmployeeRepository;
}

export type CreateUnionMemberAction = (unionMember: UnionMember) => Promise<void>;

export function buildCreateUnionMemberAction({
    unionMemberRepository,
    employeeRepository
}: Dependencies): CreateUnionMemberAction {
    return async function(unionMember: UnionMember): Promise<void> {
        await assertEmployeeExists(unionMember.employeeId);

        await unionMemberRepository.insert(unionMember);
    };

    async function assertEmployeeExists(employeeId: number): Promise<void> {
        await employeeRepository.fetchById(employeeId);
    }
}
