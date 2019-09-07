import { UnionMember } from "../../entities";
import { UnionMemberIdAlreadyUsedError } from "../../errors";
import { EmployeeRepository, UnionMemberRepository } from "../../repositories";
import { CoreUnionActions } from "../CoreActions";

interface Dependencies {
    unionMemberRepository: UnionMemberRepository;
    employeeRepository: EmployeeRepository;
}

export function makeCreateUnionMember({
    unionMemberRepository,
    employeeRepository
}: Dependencies): CoreUnionActions["createUnionMember"] {
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
