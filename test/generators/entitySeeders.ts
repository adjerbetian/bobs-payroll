import {
    buildCommissionedEmployee,
    buildDirectPaymentMethod,
    buildHoldPaymentMethod,
    buildHourlyEmployee,
    buildMailPaymentMethod,
    buildSalariedEmployee,
    buildSalesReceipt,
    buildServiceCharge,
    buildTimeCard,
    buildUnionMember,
    paymentMapper
} from "../../src";
import { dbModelSeeders as seeders } from "./dbModelSeeders";

export const entitySeeders = {
    seedHourlyEmployee: buildEntitySeeder(seeders.seedHourlyEmployee, buildHourlyEmployee),
    seedSalariedEmployee: buildEntitySeeder(seeders.seedSalariedEmployee, buildSalariedEmployee),
    seedCommissionedEmployee: buildEntitySeeder(seeders.seedCommissionedEmployee, buildCommissionedEmployee),
    seedUnionMember: buildEntitySeeder(seeders.seedUnionMember, buildUnionMember),
    seedTimeCard: buildEntitySeeder(seeders.seedTimeCard, buildTimeCard),
    seedSalesReceipt: buildEntitySeeder(seeders.seedSalesReceipt, buildSalesReceipt),
    seedServiceCharge: buildEntitySeeder(seeders.seedServiceCharge, buildServiceCharge),
    seedHoldPaymentMethod: buildEntitySeeder(seeders.seedHoldPaymentMethod, buildHoldPaymentMethod),
    seedDirectPaymentMethod: buildEntitySeeder(seeders.seedDirectPaymentMethod, buildDirectPaymentMethod),
    seedMailPaymentMethod: buildEntitySeeder(seeders.seedMailPaymentMethod, buildMailPaymentMethod),
    seedPayment: buildEntitySeeder(seeders.seedPayment, paymentMapper.toEntity)
};

function buildEntitySeeder<DBModel, Entity>(
    seeder: (args: Partial<DBModel>) => Promise<DBModel>,
    dbModelToEntityMapper: (args: DBModel) => Entity
): (args?: Partial<DBModel>) => Promise<Entity> {
    return async function(args = {}) {
        const dbModel = await seeder(args);
        return dbModelToEntityMapper(dbModel);
    };
}
