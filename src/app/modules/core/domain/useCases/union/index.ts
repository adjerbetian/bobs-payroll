import { EmployeeRepository, UnionMemberRepository } from "../../repositories";
import { CoreUnionUseCases } from "../CoreUseCases";
import { makeCreateUnionMember } from "./createUnionMember";
import { makeRemoveEmployeeFromUnion } from "./removeEmployeeFromUnion";

interface Dependencies {
    employeeRepository: EmployeeRepository;
    unionMemberRepository: UnionMemberRepository;
}

export function makeCoreUnionUseCases({ unionMemberRepository, employeeRepository }: Dependencies): CoreUnionUseCases {
    return {
        createUnionMember: makeCreateUnionMember({ employeeRepository, unionMemberRepository }),
        removeEmployeeFromUnion: makeRemoveEmployeeFromUnion({ unionMemberRepository })
    };
}
export { CoreUnionUseCases } from "../CoreUseCases";
