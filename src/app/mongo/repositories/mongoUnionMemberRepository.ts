import { CoreDependencies, UnionMember } from "../../domain";
import { MongoEntity } from "../databases";
import { UnionMemberDBModel } from "../DBModels";

export function makeMongoUnionMemberRepository(
    db: MongoEntity<UnionMember, UnionMemberDBModel>
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
