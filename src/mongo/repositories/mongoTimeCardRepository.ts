import { TimeCard, TimeCardRepository } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";

export function buildMongoTimeCardRepository(db: MongoDbAdapter<TimeCard>): TimeCardRepository {
    return {
        async fetchAllOfEmployee(employeeId: number): Promise<TimeCard[]> {
            return db.fetchAll({ employeeId });
        },
        fetchAllOfEmployeeSince(employeeId: number, date: string): Promise<TimeCard[]> {
            throw new Error("todo");
        },
        async insert(timeCard: TimeCard) {
            await db.insert(timeCard);
        }
    };
}
