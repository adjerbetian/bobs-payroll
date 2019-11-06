import { buildSeeder } from "@infra/test";
import { seeders as coreSeeders } from "@modules/core/test";
import { dbPayments } from "../db";
import { generators } from "./generators";

export const seeders = {
    ...coreSeeders,
    seedPayment: buildSeeder(generators.generatePayment, dbPayments)
};
