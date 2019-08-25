import { UnionMember, UnionMemberRepository } from "../domain";
import { dbUnionMembers } from "./db";

export const mongoUnionMemberRepository: UnionMemberRepository = {
    async fetchByEmployeeId(employeeId: number): Promise<UnionMember> {
        throw new Error("todo");
    },
    async fetchByMemberId(memberId: string): Promise<UnionMember> {
        return dbUnionMembers.fetch({ memberId });
    },
    async insert(unionMember: UnionMember): Promise<void> {
        await dbUnionMembers.insert(unionMember);
    }
};
