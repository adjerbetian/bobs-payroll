import { TimeCard } from "../entities";

export interface TimeCardRepository {
    fetchAllOfEmployee(employeeId: number): Promise<TimeCard[]>;
    fetchAllOfEmployeeSince(employeeId: number, date: string): Promise<TimeCard[]>;
    insert(timeCard: TimeCard): Promise<void>;
}
