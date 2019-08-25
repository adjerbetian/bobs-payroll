import { UnionMember } from "../entities";

export interface UnionMemberRepository {
    fetchByEmployeeId(employeeId: number): Promise<UnionMember>;
    fetchByMemberId(memberId: string): Promise<UnionMember>;
    insert(unionMember: UnionMember): Promise<void>;
}
