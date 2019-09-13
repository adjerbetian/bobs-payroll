import { CoreDependencies } from "../../domain";
import { MongoDbAdapter } from "../databases";
import { TimeCardDBModel } from "../DBModels";
import { timeCardMapper } from "../mappers";

export function makeMongoTimeCardRepository(
    db: MongoDbAdapter<TimeCardDBModel>
): CoreDependencies["timeCardRepository"] {
    return {
        async fetchAllOfEmployee(employeeId) {
            const dbModels = await db.fetchAll({ employeeId });
            return timeCardMapper.toEntities(dbModels);
        },
        async fetchAllOfEmployeeSince(employeeId, date) {
            const dbModels = await db.fetchAll({ employeeId, date: { $gt: date } });
            return timeCardMapper.toEntities(dbModels);
        },
        async insert(timeCard) {
            await db.insert(timeCardMapper.toDBModel(timeCard));
        }
    };
}
