import { buildTimeCard, CoreDependencies, TimeCard } from "../../domain";
import { TimeCardDBModel } from "../DBModels";
import { MongoDbAdapter } from "../databases";

export function makeMongoTimeCardRepository(
    db: MongoDbAdapter<TimeCardDBModel>
): CoreDependencies["timeCardRepository"] {
    return {
        async fetchAllOfEmployee(employeeId) {
            const dbModels = await db.fetchAll({ employeeId });
            return toEntities(dbModels);
        },
        async fetchAllOfEmployeeSince(employeeId, date) {
            const dbModels = await db.fetchAll({ employeeId, date: { $gt: date } });
            return toEntities(dbModels);
        },
        async insert(timeCard) {
            await db.insert(toDBModel(timeCard));
        }
    };
}

function toDBModel(timeCard: TimeCard): TimeCardDBModel {
    return {
        employeeId: timeCard.getEmployeeId(),
        date: timeCard.getDate(),
        hours: timeCard.getHours()
    };
}
function toEntities(timeCardDBModels: TimeCardDBModel[]): TimeCard[] {
    return timeCardDBModels.map(model => toEntity(model));
}
function toEntity(timeCardDBModel: TimeCardDBModel): TimeCard {
    return buildTimeCard(timeCardDBModel);
}
