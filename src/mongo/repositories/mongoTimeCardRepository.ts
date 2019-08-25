import { TimeCard, TimeCardRepository } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";

export function buildMongoTimeCardRepository(db: MongoDbAdapter<TimeCard>): TimeCardRepository {
    return {
        async fetchAllOfEmployee(employeeId: number): Promise<TimeCard[]> {
            return db.fetchAll({ employeeId });
        },
        async insert(timeCard: TimeCard) {
            await db.insert(timeCard);
        }
    };
}
