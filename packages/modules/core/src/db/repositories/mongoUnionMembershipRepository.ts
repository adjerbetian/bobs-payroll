import { MongoEntity } from "@infra/mongo";
import { CoreDependencies, UnionMembership } from "../../domain";
import { UnionMembershipDBModel } from "../DBModels";

export function makeMongoUnionMembershipRepository(
    db: MongoEntity<UnionMembership, UnionMembershipDBModel>
): CoreDependencies["unionMembershipRepository"] {
    return {
        async fetchByEmployeeId(employeeId) {
            return db.fetch({ employeeId });
        },
        async fetchByMemberId(memberId) {
            return db.fetch({ memberId });
        },
        async insert(unionMembership) {
            await db.insert(unionMembership);
        },
        async doesMemberIdExist(memberId) {
            return db.exists({ memberId: memberId });
        },
        async deleteByEmployeeId(employeeId) {
            return db.remove({ employeeId });
        }
    };
}
