import { UnionMemberRepository } from "../../repositories";
import { CoreUnionActions } from "../CoreActions";

interface Dependencies {
    unionMemberRepository: UnionMemberRepository;
}

export function buildRemoveEmployeeFromUnion({
    unionMemberRepository
}: Dependencies): CoreUnionActions["removeEmployeeFromUnion"] {
    return async function(employeeId: number): Promise<void> {
        await unionMemberRepository.deleteByEmployeeId(employeeId);
    };
}