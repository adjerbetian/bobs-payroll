import { buildSeeder } from "@payroll/test";
import { seeders as coreSeeders } from "@payroll/core/test";
import { dbPayments } from "../db";
import { generators } from "./generators";

export const seeders = {
    ...coreSeeders,
    seedPayment: buildSeeder(generators.generatePayment, dbPayments)
};
