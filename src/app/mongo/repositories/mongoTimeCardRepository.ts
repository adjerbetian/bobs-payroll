import { CoreDependencies, TimeCard } from "../../domain";
import { MongoEntity } from "../databases";

export function makeMongoTimeCardRepository(db: MongoEntity<TimeCard>): CoreDependencies["timeCardRepository"] {
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
