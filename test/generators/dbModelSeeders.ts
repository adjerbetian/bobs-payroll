import { dbEmployees, dbSalesReceipts, dbTimeCards, dbUnionMembers, MongoDbAdapter } from "../../src";
import { dbModelGenerators as gen } from "./dbModelGenerators";

export const dbModelSeeders = {
    seedHourlyEmployee: buildDBModelSeeder(gen.generateHourlyEmployee, dbEmployees),
    seedSalariedEmployee: buildDBModelSeeder(gen.generateSalariedEmployee, dbEmployees),
    seedCommissionedEmployee: buildDBModelSeeder(gen.generateCommissionedEmployee, dbEmployees),
    seedUnionMember: buildDBModelSeeder(gen.generateUnionMember, dbUnionMembers),
    seedTimeCard: buildDBModelSeeder(gen.generateTimeCard, dbTimeCards),
    seedSalesReceipt: buildDBModelSeeder(gen.generateSalesReceipt, dbSalesReceipts)
};

function buildDBModelSeeder<DBModel extends DBModelSubType, DBModelSubType>(
    generator: (args: Partial<DBModel>) => DBModel,
    db: MongoDbAdapter<DBModelSubType>
): (args?: Partial<DBModel>) => Promise<DBModel> {
    return async function(args = {}) {
        const dbModel = generator(args);
        await db.insert(dbModel);
        return dbModel;
    };
}
