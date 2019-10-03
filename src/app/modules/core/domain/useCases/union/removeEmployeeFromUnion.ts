import { UnionMemberRepository } from "../../repositories";
import { CoreUnionUseCases } from "../CoreUseCases";

interface Dependencies {
    unionMemberRepository: UnionMemberRepository;
}

export function makeRemoveEmployeeFromUnion({
    unionMemberRepository
}: Dependencies): CoreUnionUseCases["removeEmployeeFromUnion"] {
    return async function(employeeId) {
        await unionMemberRepository.deleteByEmployeeId(employeeId);
    };
}
