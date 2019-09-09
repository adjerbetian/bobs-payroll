import {
    buildCommissionedEmployee,
    buildHourlyEmployee,
    buildSalariedEmployee,
    buildSalesReceipt,
    buildTimeCard,
    buildUnionMember
} from "../../src";
import { dbModelSeeders as seeders } from "./dbModelSeeders";

export const entitySeeders = {
    seedHourlyEmployee: buildEntitySeeder(seeders.seedHourlyEmployee, buildHourlyEmployee),
    seedSalariedEmployee: buildEntitySeeder(seeders.seedSalariedEmployee, buildSalariedEmployee),
    seedCommissionedEmployee: buildEntitySeeder(seeders.seedCommissionedEmployee, buildCommissionedEmployee),
    seedUnionMember: buildEntitySeeder(seeders.seedUnionMember, buildUnionMember),
    seedTimeCard: buildEntitySeeder(seeders.seedTimeCard, buildTimeCard),
    seedSalesReceipt: buildEntitySeeder(seeders.seedSalesReceipt, buildSalesReceipt)
};

function buildEntitySeeder<DBModel, Entity>(
    seeder: (args: Partial<DBModel>) => Promise<DBModel>,
    entityBuilder: (args: DBModel) => Entity
): (args?: Partial<DBModel>) => Promise<Entity> {
    return async function(args = {}) {
        const dbModel = await seeder(args);
        return entityBuilder(dbModel);
    };
}
