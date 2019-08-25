import { UnionMember, UnionMemberRepository } from "../../domain";
import { dbUnionMembers } from "../db";
import { MongoDbAdapter } from "../mongoDbAdapter";

export const mongoUnionMemberRepository: UnionMemberRepository = buildMongoUnionMemberRepository(dbUnionMembers);

export function buildMongoUnionMemberRepository(db: MongoDbAdapter<UnionMember>): UnionMemberRepository {
    return {
        async fetchByEmployeeId(employeeId: number): Promise<UnionMember> {
            return db.fetch({ employeeId });
        },
        async fetchByMemberId(memberId: string): Promise<UnionMember> {
            return db.fetch({ memberId });
        },
        async insert(unionMember: UnionMember): Promise<void> {
            await db.insert(unionMember);
        }
    };
}
