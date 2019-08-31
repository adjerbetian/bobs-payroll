import { UnionMemberRepository } from "../repositories";

interface Dependencies {
    unionMemberRepository: UnionMemberRepository;
}

export type RemoveEmployeeFromUnion = (employeeId: number) => Promise<void>;

export function buildRemoveEmployeeFromUnion({ unionMemberRepository }: Dependencies): RemoveEmployeeFromUnion {
    return async function(employeeId: number): Promise<void> {
        await unionMemberRepository.deleteByEmployeeId(employeeId);
    };
}
