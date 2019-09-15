import { UnionMemberRepository } from "../../repositories";
import { CoreUnionActions } from "../CoreActions";

interface Dependencies {
    unionMemberRepository: UnionMemberRepository;
}

export function makeRemoveEmployeeFromUnion({
    unionMemberRepository
}: Dependencies): CoreUnionActions["removeEmployeeFromUnion"] {
    return async function(employeeId) {
        await unionMemberRepository.deleteByEmployeeId(employeeId);
    };
}
