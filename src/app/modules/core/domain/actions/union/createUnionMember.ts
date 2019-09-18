import { buildUnionMember } from "../../entities";
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
    return async function(creationModel) {
        await assertEmployeeExists();
        await assertMemberIdIsNotTaken();

        const unionMember = buildUnionMember(creationModel);
        await unionMemberRepository.insert(unionMember);

        async function assertEmployeeExists(): Promise<void> {
            await employeeRepository.fetchById(creationModel.employeeId);
        }

        async function assertMemberIdIsNotTaken(): Promise<void> {
            const memberIdExists = await unionMemberRepository.doesMemberIdExist(creationModel.memberId);
            if (memberIdExists) throw new UnionMemberIdAlreadyUsedError(creationModel.memberId);
        }
    };
}
