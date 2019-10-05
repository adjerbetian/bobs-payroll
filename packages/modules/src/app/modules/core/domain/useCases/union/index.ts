import { EmployeeRepository, UnionMembershipRepository } from "../../repositories";
import { CoreUnionUseCases } from "../CoreUseCases";
import { makeCreateUnionMembership } from "./createUnionMembership";
import { makeRemoveEmployeeFromUnion } from "./removeEmployeeFromUnion";

interface Dependencies {
    employeeRepository: EmployeeRepository;
    unionMembershipRepository: UnionMembershipRepository;
}

export function makeCoreUnionUseCases({
    unionMembershipRepository,
    employeeRepository
}: Dependencies): CoreUnionUseCases {
    return {
        createUnionMembership: makeCreateUnionMembership({ employeeRepository, unionMembershipRepository }),
        removeEmployeeFromUnion: makeRemoveEmployeeFromUnion({ unionMembershipRepository })
    };
}
export { CoreUnionUseCases } from "../CoreUseCases";
