import { UnionMember } from "../entities";
import { UnionMemberIdAlreadyUsedError } from "../errors";
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
        await assertMemberIdIsNotTaken(unionMember);

        if (await doesUnionMemberExist(unionMember)) {
            await unionMemberRepository.update(unionMember);
        } else {
            await unionMemberRepository.insert(unionMember);
        }
    };

    async function assertEmployeeExists(employeeId: number): Promise<void> {
        await employeeRepository.fetchById(employeeId);
    }

    async function assertMemberIdIsNotTaken(unionMember: UnionMember): Promise<void> {
        const memberIdExists = await unionMemberRepository.exists({ memberId: unionMember.memberId });
        const memberIdAlreadyBelongsToEmployee = await doesUnionMemberExist(unionMember);

        if (memberIdExists && !memberIdAlreadyBelongsToEmployee) {
            throw new UnionMemberIdAlreadyUsedError(unionMember.memberId);
        }
    }

    async function doesUnionMemberExist(unionMember: UnionMember): Promise<boolean> {
        return await unionMemberRepository.exists({
            memberId: unionMember.memberId,
            employeeId: unionMember.employeeId
        });
    }
}
