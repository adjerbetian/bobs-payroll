import { buildSeeder } from "@payroll/test";
import { dbEmployees, dbPaymentMethods, dbSalesReceipts, dbServiceCharges, dbTimeCards, dbUnionMembers } from "../db";
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
    seedMailPaymentMethod: buildSeeder(generators.generateMailPaymentMethod, dbPaymentMethods)
};
