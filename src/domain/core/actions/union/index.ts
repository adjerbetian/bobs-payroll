import { EmployeeRepository, UnionMemberRepository } from "../../repositories";
import { CoreUnionActions } from "../CoreActions";
import { makeCreateUnionMember } from "./createUnionMember";
import { makeRemoveEmployeeFromUnion } from "./removeEmployeeFromUnion";

interface Dependencies {
    employeeRepository: EmployeeRepository;
    unionMemberRepository: UnionMemberRepository;
}

export function makeCoreUnionActions({ unionMemberRepository, employeeRepository }: Dependencies): CoreUnionActions {
    return {
        createUnionMember: makeCreateUnionMember({ employeeRepository, unionMemberRepository }),
        removeEmployeeFromUnion: makeRemoveEmployeeFromUnion({ unionMemberRepository })
    };
}
export { CoreUnionActions } from "../CoreActions";
