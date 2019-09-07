import { CoreDependencies, TimeCard } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";

export function makeMongoTimeCardRepository(db: MongoDbAdapter<TimeCard>): CoreDependencies["timeCardRepository"] {
    return {
        async fetchAllOfEmployee(employeeId: number): Promise<TimeCard[]> {
            return db.fetchAll({ employeeId });
        },
        async fetchAllOfEmployeeSince(employeeId: number, date: string): Promise<TimeCard[]> {
            return db.fetchAll({ employeeId, date: { $gt: date } });
        },
        async insert(timeCard: TimeCard) {
            await db.insert(timeCard);
        }
    };
}
