import { TimeCard, TimeCardRepository } from "../../domain";
import { dbTimeCards } from "../db";
import { MongoDbAdapter } from "../mongoDbAdapter";

export const mongoTimeCardRepository: TimeCardRepository = buildMongoTimeCardRepository(dbTimeCards);

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
