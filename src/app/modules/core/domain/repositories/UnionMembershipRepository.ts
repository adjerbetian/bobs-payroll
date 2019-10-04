import { UnionMembership } from "../entities";

export interface UnionMembershipRepository {
    fetchByEmployeeId(employeeId: number): Promise<UnionMembership>;
    fetchByMemberId(memberId: string): Promise<UnionMembership>;
    doesMemberIdExist(memberId: string): Promise<boolean>;
    insert(unionMembership: UnionMembership): Promise<void>;
    deleteByEmployeeId(employeeId: number): Promise<void>;
}
