import { buildUnionMember, UnionMember } from "../../domain";
import { UnionMemberDBModel } from "../DBModels";
import { buildMapper } from "./mapper";

export const unionMemberMapper = buildMapper<UnionMember, UnionMemberDBModel>({
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
