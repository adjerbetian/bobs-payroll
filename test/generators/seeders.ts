import {
    CommissionedEmployee,
    dbEmployees,
    dbPaymentMethods,
    dbPayments,
    dbSalesReceipts,
    dbServiceCharges,
    dbTimeCards,
    dbUnionMembers,
    DirectPaymentMethod,
    EntityModel,
    HoldPaymentMethod,
    HourlyEmployee,
    MailPaymentMethod,
    SalariedEmployee
} from "../../src";
import { generators } from "./generators";

// prettier-ignore
export const seeders = {
    seedHourlyEmployee: buildEntitySeeder<HourlyEmployee>(generators.generateHourlyEmployee, dbEmployees),
    seedSalariedEmployee: buildEntitySeeder<SalariedEmployee>(generators.generateSalariedEmployee, dbEmployees),
    seedCommissionedEmployee: buildEntitySeeder<CommissionedEmployee>(generators.generateCommissionedEmployee, dbEmployees),
    seedUnionMember: buildEntitySeeder(generators.generateUnionMember, dbUnionMembers),
    seedTimeCard: buildEntitySeeder(generators.generateTimeCard, dbTimeCards),
    seedSalesReceipt: buildEntitySeeder(generators.generateSalesReceipt, dbSalesReceipts),
    seedServiceCharge: buildEntitySeeder(generators.generateServiceCharge, dbServiceCharges),
    seedHoldPaymentMethod: buildEntitySeeder<HoldPaymentMethod>(generators.generateHoldPaymentMethod, dbPaymentMethods),
    seedDirectPaymentMethod: buildEntitySeeder<DirectPaymentMethod>(generators.generateDirectPaymentMethod, dbPaymentMethods),
    seedMailPaymentMethod: buildEntitySeeder<MailPaymentMethod>(generators.generateMailPaymentMethod, dbPaymentMethods),
    seedPayment: buildEntitySeeder(generators.generatePayment, dbPayments)
};

function buildEntitySeeder<Entity>(
    generator: (args: Partial<EntityModel<Entity>>) => Entity,
    inserter: { insert: (entity: Entity) => Promise<void> }
): (args?: Partial<EntityModel<Entity>>) => Promise<Entity> {
    return async function(args = {}) {
        const entity = generator(args);
        await inserter.insert(entity);
        return entity;
    };
}
