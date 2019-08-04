import { TimeCardRepository } from "../repositories";
import { TimeCard } from "../entities";
import { dbTimeCards } from "./db";

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

function cleanMongoEntity<T>(entity: T): T {
    // @ts-ignore
    delete entity._id;
    return entity;
}
