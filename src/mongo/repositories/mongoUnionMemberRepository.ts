import { CoreDependencies } from "../../domain";
import { MongoDbAdapter } from "../databases";
import { UnionMemberDBModel } from "../DBModels";
import { unionMemberMapper } from "../mappers";

export function makeMongoUnionMemberRepository(
    db: MongoDbAdapter<UnionMemberDBModel>
): CoreDependencies["unionMemberRepository"] {
    return {
        async fetchByEmployeeId(employeeId) {
            const dbModel = await db.fetch({ employeeId });
            return unionMemberMapper.toEntity(dbModel);
        },
        async fetchByMemberId(memberId) {
            const dbModel = await db.fetch({ memberId });
            return unionMemberMapper.toEntity(dbModel);
        },
        async insert(unionMember) {
            await db.insert(unionMemberMapper.toDBModel(unionMember));
        },
        async doesMemberIdExist(memberId) {
            return db.exists({ memberId: memberId });
        },
        async deleteByEmployeeId(employeeId) {
            return db.remove({ employeeId });
        }
    };
}
