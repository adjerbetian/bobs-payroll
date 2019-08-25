import { dbEmployees, dbPaymentMethods, dbSalesReceipts, dbServiceCharges } from "./db";
import {
    buildMongoEmployeeRepository,
    buildMongoPaymentMethodRepository,
    buildMongoSalesReceiptRepository,
    buildMongoServiceChargeRepository
} from "./repositories";

export { initConnection, closeConnection, cleanCollections } from "./db";
export { MongoDbAdapter } from "./mongoDbAdapter";

export { mongoTimeCardRepository, mongoUnionMemberRepository } from "./repositories";

export const mongoEmployeeRepository = buildMongoEmployeeRepository(dbEmployees);
export const mongoSalesReceiptRepository = buildMongoSalesReceiptRepository(dbSalesReceipts);
export const mongoPaymentMethodRepository = buildMongoPaymentMethodRepository(dbPaymentMethods);
export const mongoServiceChargeRepository = buildMongoServiceChargeRepository(dbServiceCharges);
