import { EmployeeRepository, UnionMemberRepository } from "../../repositories";
import { CoreUnionActions } from "./CoreUnionActions";
import { buildCreateUnionMember } from "./createUnionMember";
import { buildRemoveEmployeeFromUnion } from "./removeEmployeeFromUnion";

export { CoreUnionActions } from "./CoreUnionActions";

interface Dependencies {
    employeeRepository: EmployeeRepository;
    unionMemberRepository: UnionMemberRepository;
}

export function buildCoreUnionActions({ unionMemberRepository, employeeRepository }: Dependencies): CoreUnionActions {
    return {
        createUnionMember: buildCreateUnionMember({ employeeRepository, unionMemberRepository }),
        removeEmployeeFromUnion: buildRemoveEmployeeFromUnion({ unionMemberRepository })
    };
}
