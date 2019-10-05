import { MongoEntity } from "@bobs-payroll/mongo";
import { CoreDependencies, TimeCard } from "../../domain";
import { TimeCardDBModel } from "../DBModels";

export function makeMongoTimeCardRepository(
    db: MongoEntity<TimeCard, TimeCardDBModel>
): CoreDependencies["timeCardRepository"] {
    return {
        async fetchAllOfEmployee(employeeId) {
            return db.fetchAll({ employeeId });
        },
        async fetchAllOfEmployeeSince(employeeId, date) {
            return db.fetchAll({ employeeId, date: { $gt: date } });
        },
        async insert(timeCard) {
            await db.insert(timeCard);
        }
    };
}
