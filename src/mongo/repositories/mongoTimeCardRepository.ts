import { buildTimeCard, CoreDependencies, TimeCard } from "../../domain";
import { TimeCardDBModel } from "../DBModels";
import { MongoDbAdapter } from "../mongoDbAdapter";

export function makeMongoTimeCardRepository(
    db: MongoDbAdapter<TimeCardDBModel>
): CoreDependencies["timeCardRepository"] {
    return {
        async fetchAllOfEmployee(employeeId: number): Promise<TimeCard[]> {
            const dbModels = await db.fetchAll({ employeeId });
            return toEntities(dbModels);
        },
        async fetchAllOfEmployeeSince(employeeId: number, date: string): Promise<TimeCard[]> {
            const dbModels = await db.fetchAll({ employeeId, date: { $gt: date } });
            return toEntities(dbModels);
        },
        async insert(timeCard: TimeCard) {
            await db.insert(toDBModel(timeCard));
        }
    };
}

export function toDBModel(timeCard: TimeCard): TimeCardDBModel {
    return {
        employeeId: timeCard.getEmployeeId(),
        date: timeCard.getDate(),
        hours: timeCard.getHours()
    };
}
export function toEntities(timeCardDBModels: TimeCardDBModel[]): TimeCard[] {
    return timeCardDBModels.map(model => toEntity(model));
}
export function toEntity(timeCardDBModel: TimeCardDBModel): TimeCard {
    return buildTimeCard(timeCardDBModel);
}
