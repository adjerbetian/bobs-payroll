import { TimeCard, TimeCardRepository } from "../core";
import { dbTimeCards } from "./db";
import { cleanMongoEntity } from "./utils";

export const timeCardRepository: TimeCardRepository = {
    async fetchAllOfEmployee(employeeId: number): Promise<TimeCard[]> {
        const timeCards = await dbTimeCards.find({ employeeId }).toArray();
        return timeCards.map(e => cleanMongoEntity(e));
    },
    async insertOne(timeCard: TimeCard) {
        await dbTimeCards.insertOne(timeCard);
        cleanMongoEntity(timeCard);
    }
};
