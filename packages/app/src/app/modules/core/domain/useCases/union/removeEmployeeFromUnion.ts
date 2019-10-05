import { UnionMembershipRepository } from "../../repositories";
import { CoreUnionUseCases } from "../CoreUseCases";

interface Dependencies {
    unionMembershipRepository: UnionMembershipRepository;
}

export function makeRemoveEmployeeFromUnion({
    unionMembershipRepository
}: Dependencies): CoreUnionUseCases["removeEmployeeFromUnion"] {
    return async function(employeeId) {
        await unionMembershipRepository.deleteByEmployeeId(employeeId);
    };
}
