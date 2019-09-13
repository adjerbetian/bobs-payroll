import { buildTimeCard, TimeCard } from "../../domain";
import { TimeCardDBModel } from "../DBModels";
import { buildMapper, Mapper } from "./mapper";

type TimeCardMapper = Mapper<TimeCardDBModel, TimeCard>;

export const timeCardMapper: TimeCardMapper = buildMapper({
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
