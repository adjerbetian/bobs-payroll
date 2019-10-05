import { buildUnionMembership } from "../../entities";
import { UnionMemberIdAlreadyUsedError } from "../../errors";
import { EmployeeRepository, UnionMembershipRepository } from "../../repositories";
import { CoreUnionUseCases } from "../CoreUseCases";

interface Dependencies {
    unionMembershipRepository: UnionMembershipRepository;
    employeeRepository: EmployeeRepository;
}

export function makeCreateUnionMembership({
    unionMembershipRepository,
    employeeRepository
}: Dependencies): CoreUnionUseCases["createUnionMembership"] {
    return async function(creationModel) {
        await assertEmployeeExists();
        await assertMemberIdIsNotTaken();

        const unionMembership = buildUnionMembership(creationModel);
        await unionMembershipRepository.insert(unionMembership);

        async function assertEmployeeExists(): Promise<void> {
            await employeeRepository.fetchById(creationModel.employeeId);
        }

        async function assertMemberIdIsNotTaken(): Promise<void> {
            const memberIdExists = await unionMembershipRepository.doesMemberIdExist(creationModel.memberId);
            if (memberIdExists) throw new UnionMemberIdAlreadyUsedError(creationModel.memberId);
        }
    };
}
