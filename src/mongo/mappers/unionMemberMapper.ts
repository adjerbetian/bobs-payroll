import { buildUnionMember, UnionMember } from "../../domain";
import { UnionMemberDBModel } from "../DBModels";
import { buildMapper, Mapper } from "./mapper";

type UnionMemberMapper = Mapper<UnionMemberDBModel, UnionMember>;

export const unionMemberMapper: UnionMemberMapper = buildMapper({
    toEntity(model) {
        return buildUnionMember({
            employeeId: model.employeeId,
            memberId: model.memberId,
            rate: model.rate
        });
    },
    toDBModel(entity) {
        return {
            employeeId: entity.getEmployeeId(),
            memberId: entity.getMemberId(),
            rate: entity.getRate()
        };
    }
});
