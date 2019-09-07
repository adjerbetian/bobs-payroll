import { buildUnionMember, CoreDependencies, UnionMember } from "../../domain";
import { UnionMemberDBModel } from "../DBModels";
import { MongoDbAdapter } from "../mongoDbAdapter";

export function makeMongoUnionMemberRepository(
    db: MongoDbAdapter<UnionMemberDBModel>
): CoreDependencies["unionMemberRepository"] {
    return {
        async fetchByEmployeeId(employeeId: number): Promise<UnionMember> {
            const dbModel = await db.fetch({ employeeId });
            return toEntity(dbModel);
        },
        async fetchByMemberId(memberId: string): Promise<UnionMember> {
            const dbModel = await db.fetch({ memberId });
            return toEntity(dbModel);
        },
        async insert(unionMember: UnionMember): Promise<void> {
            await db.insert(toDBModel(unionMember));
        },
        async doesMemberIdExist(memberId: string): Promise<boolean> {
            return db.exists({ memberId: memberId });
        },
        async deleteByEmployeeId(employeeId: number): Promise<void> {
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
