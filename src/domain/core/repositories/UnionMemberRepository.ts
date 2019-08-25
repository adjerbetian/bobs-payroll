import { UnionMember } from "../entities";

export interface UnionMemberRepository {
    fetchByEmployeeId(employeeId: number): Promise<UnionMember>;
    fetchByMemberId(memberId: string): Promise<UnionMember>;
    insertOne(unionMember: UnionMember): Promise<void>;
}
