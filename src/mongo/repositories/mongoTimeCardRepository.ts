import { TimeCard, TimeCardRepository } from "../../domain";
import { dbTimeCards } from "../db";

export const mongoTimeCardRepository: TimeCardRepository = {
    async fetchAllOfEmployee(employeeId: number): Promise<TimeCard[]> {
        return dbTimeCards.fetchAll({ employeeId });
    },
    async insert(timeCard: TimeCard) {
        await dbTimeCards.insert(timeCard);
    }
};
