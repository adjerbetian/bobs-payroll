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
        async update(unionMember: UnionMember): Promise<void> {
            await db.update(
                { memberId: unionMember.memberId, employeeId: unionMember.employeeId },
                { $set: { rate: unionMember.rate } }
            );
        },
        async exists(unionMember: UnionMember): Promise<boolean> {
            return db.exists({ memberId: unionMember.memberId, employeeId: unionMember.employeeId });
        }
    };
}
