import { dbEmployees, dbPaymentMethods, dbSalesReceipts } from "./db";
import {
    buildMongoEmployeeRepository,
    buildMongoPaymentMethodRepository,
    buildMongoSalesReceiptRepository
} from "./repositories";

export { initConnection, closeConnection, cleanCollections } from "./db";
export { MongoDbAdapter } from "./mongoDbAdapter";

export { mongoTimeCardRepository, mongoServiceChargeRepository, mongoUnionMemberRepository } from "./repositories";

export const mongoEmployeeRepository = buildMongoEmployeeRepository(dbEmployees);
export const mongoSalesReceiptRepository = buildMongoSalesReceiptRepository(dbSalesReceipts);
export const mongoPaymentMethodRepository = buildMongoPaymentMethodRepository(dbPaymentMethods);
