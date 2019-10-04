import { buildMapper } from "../../../../mongo";
import { buildUnionMembership, UnionMembership } from "../../domain";
import { UnionMembershipDBModel } from "../DBModels";

export const unionMembershipMapper = buildMapper<UnionMembership, UnionMembershipDBModel>({
    toEntity(model) {
        return buildUnionMembership({
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
