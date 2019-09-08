import { buildUnionMember, CoreDependencies, UnionMember } from "../../domain";
import { UnionMemberDBModel } from "../DBModels";
import { MongoDbAdapter } from "../databases";

export function makeMongoUnionMemberRepository(
    db: MongoDbAdapter<UnionMemberDBModel>
): CoreDependencies["unionMemberRepository"] {
    return {
        async fetchByEmployeeId(employeeId) {
            const dbModel = await db.fetch({ employeeId });
            return toEntity(dbModel);
        },
        async fetchByMemberId(memberId) {
            const dbModel = await db.fetch({ memberId });
            return toEntity(dbModel);
        },
        async insert(unionMember) {
            await db.insert(toDBModel(unionMember));
        },
        async doesMemberIdExist(memberId) {
            return db.exists({ memberId: memberId });
        },
        async deleteByEmployeeId(employeeId) {
            return db.remove({ employeeId });
        }
    };
}

export function toDBModel(unionMember: UnionMember): UnionMemberDBModel {
    return {
        employeeId: unionMember.getEmployeeId(),
        memberId: unionMember.getMemberId(),
        rate: unionMember.getRate()
    };
}
export function toEntity(unionMemberDBModel: UnionMemberDBModel): UnionMember {
    return buildUnionMember(unionMemberDBModel);
}
