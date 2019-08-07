import { TimeCard } from "../entities";

export interface TimeCardRepository {
    fetchAllOfEmployee(employeeId: number): Promise<TimeCard[]>;
    insertOne(timeCard: TimeCard): Promise<void>;
}
