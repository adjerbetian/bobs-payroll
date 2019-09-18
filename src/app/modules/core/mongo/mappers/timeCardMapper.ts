import { buildMapper } from "../../../../mongo";
import { buildTimeCard, TimeCard } from "../../domain";
import { TimeCardDBModel } from "../DBModels";

export const timeCardMapper = buildMapper<TimeCard, TimeCardDBModel>({
    toEntity(model) {
        return buildTimeCard({
            employeeId: model.employeeId,
            date: model.date,
            hours: model.hours
        });
    },
    toDBModel(entity) {
        return {
            employeeId: entity.getEmployeeId(),
            date: entity.getDate(),
            hours: entity.getHours()
        };
    }
});
