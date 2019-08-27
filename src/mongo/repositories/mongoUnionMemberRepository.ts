import { UnionMember, UnionMemberRepository } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";

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
        },
        async exists(query: Partial<UnionMember>): Promise<boolean> {
            return db.exists(query);
        },
        async deleteByEmployeeId(employeeId: number): Promise<void> {
            return db.remove({ employeeId });
        }
    };
}
