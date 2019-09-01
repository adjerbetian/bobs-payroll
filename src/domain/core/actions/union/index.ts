import { EmployeeRepository, UnionMemberRepository } from "../../repositories";
import { CoreUnionActions } from "../CoreActions";
import { buildCreateUnionMember } from "./createUnionMember";
import { buildRemoveEmployeeFromUnion } from "./removeEmployeeFromUnion";

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
export { CoreUnionActions } from "../CoreActions";
