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
    return async function(unionMember) {
        await assertEmployeeExists();
        await assertMemberIdIsNotTaken();
        await unionMemberRepository.insert(unionMember);

        async function assertEmployeeExists(): Promise<void> {
            await employeeRepository.fetchById(unionMember.getEmployeeId());
        }

        async function assertMemberIdIsNotTaken(): Promise<void> {
            const memberIdExists = await unionMemberRepository.doesMemberIdExist(unionMember.getMemberId());
            if (memberIdExists) throw new UnionMemberIdAlreadyUsedError(unionMember.getMemberId());
        }
    };
}
