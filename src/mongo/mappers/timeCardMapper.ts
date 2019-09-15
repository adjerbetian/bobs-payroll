import { buildTimeCard, TimeCard } from "../../domain";
import { buildMapper } from "./mapper";

export const timeCardMapper = buildMapper<TimeCard>({
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
