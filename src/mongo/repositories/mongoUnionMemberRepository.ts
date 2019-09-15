import { CoreDependencies, UnionMember } from "../../domain";
import { MongoEntity } from "../databases";

export function makeMongoUnionMemberRepository(
    db: MongoEntity<UnionMember>
): CoreDependencies["unionMemberRepository"] {
    return {
        async fetchByEmployeeId(employeeId) {
            return db.fetch({ employeeId });
        },
        async fetchByMemberId(memberId) {
            return db.fetch({ memberId });
        },
        async insert(unionMember) {
            await db.insert(unionMember);
        },
        async doesMemberIdExist(memberId) {
            return db.exists({ memberId: memberId });
        },
        async deleteByEmployeeId(employeeId) {
            return db.remove({ employeeId });
        }
    };
}
