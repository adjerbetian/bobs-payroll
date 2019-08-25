import { TimeCard } from "../entities";

export interface TimeCardRepository {
    fetchAllOfEmployee(employeeId: number): Promise<TimeCard[]>;
    insert(timeCard: TimeCard): Promise<void>;
}
