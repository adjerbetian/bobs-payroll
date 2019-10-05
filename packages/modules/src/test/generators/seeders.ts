import {
    dbEmployees,
    dbPaymentMethods,
    dbSalesReceipts,
    dbServiceCharges,
    dbTimeCards,
    dbUnionMembers
} from "../../core";
import { dbPayments } from "../../payment";
import { generators } from "./generators";

export const seeders = {
    seedHourlyEmployee: buildSeeder(generators.generateHourlyEmployee, dbEmployees),
    seedSalariedEmployee: buildSeeder(generators.generateSalariedEmployee, dbEmployees),
    seedCommissionedEmployee: buildSeeder(generators.generateCommissionedEmployee, dbEmployees),
    seedUnionMembership: buildSeeder(generators.generateUnionMembership, dbUnionMembers),
    seedTimeCard: buildSeeder(generators.generateTimeCard, dbTimeCards),
    seedSalesReceipt: buildSeeder(generators.generateSalesReceipt, dbSalesReceipts),
    seedServiceCharge: buildSeeder(generators.generateServiceCharge, dbServiceCharges),
    seedHoldPaymentMethod: buildSeeder(generators.generateHoldPaymentMethod, dbPaymentMethods),
    seedDirectPaymentMethod: buildSeeder(generators.generateDirectPaymentMethod, dbPaymentMethods),
    seedMailPaymentMethod: buildSeeder(generators.generateMailPaymentMethod, dbPaymentMethods),
    seedPayment: buildSeeder(generators.generatePayment, dbPayments)
};

function buildSeeder<Generator extends (args: any) => any>(
    generator: Generator,
    inserter: { insert: (entity: ReturnType<Generator>) => Promise<void> }
): (args?: Parameters<Generator>[0]) => Promise<ReturnType<Generator>> {
    return async function(args = {}) {
        const entity = generator(args);
        await inserter.insert(entity);
        return entity;
    };
}
