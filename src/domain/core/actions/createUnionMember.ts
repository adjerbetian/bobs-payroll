import { UnionMember } from "../entities";
import { UnionMemberIdAlreadyUsedError } from "../errors";
import { EmployeeRepository, UnionMemberRepository } from "../repositories";

interface Dependencies {
    unionMemberRepository: UnionMemberRepository;
    employeeRepository: EmployeeRepository;
}

export type CreateUnionMember = (unionMember: UnionMember) => Promise<void>;

export function buildCreateUnionMember({ unionMemberRepository, employeeRepository }: Dependencies): CreateUnionMember {
    return async function(unionMember: UnionMember): Promise<void> {
        await assertEmployeeExists(unionMember.employeeId);
        await assertMemberIdIsNotTaken(unionMember);

        await unionMemberRepository.insert(unionMember);
    };

    async function assertEmployeeExists(employeeId: number): Promise<void> {
        await employeeRepository.fetchById(employeeId);
    }

    async function assertMemberIdIsNotTaken(unionMember: UnionMember): Promise<void> {
        const memberIdExists = await unionMemberRepository.exists({ memberId: unionMember.memberId });
        if (memberIdExists) throw new UnionMemberIdAlreadyUsedError(unionMember.memberId);
    }
}
