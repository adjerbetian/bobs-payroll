import { UnionMember } from "../entities";

export interface UnionMemberRepository {
    fetchByEmployeeId(employeeId: number): Promise<UnionMember>;
    fetchByMemberId(memberId: string): Promise<UnionMember>;
    exists(query: Partial<UnionMember>): Promise<boolean>;
    insert(unionMember: UnionMember): Promise<void>;
    deleteByEmployeeId(employeeId: number): Promise<void>;
}
