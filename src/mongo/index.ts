import { dbEmployees, dbPaymentMethods, dbSalesReceipts, dbServiceCharges, dbTimeCards, dbUnionMembers } from "./db";
import {
    buildMongoEmployeeRepository,
    buildMongoPaymentMethodRepository,
    buildMongoSalesReceiptRepository,
    buildMongoServiceChargeRepository,
    buildMongoTimeCardRepository,
    buildMongoUnionMemberRepository
} from "./repositories";

export { initConnection, closeConnection, cleanCollections } from "./db";
export { MongoDbAdapter } from "./mongoDbAdapter";

export const mongoEmployeeRepository = buildMongoEmployeeRepository(dbEmployees);
export const mongoPaymentMethodRepository = buildMongoPaymentMethodRepository(dbPaymentMethods);
export const mongoSalesReceiptRepository = buildMongoSalesReceiptRepository(dbSalesReceipts);
export const mongoServiceChargeRepository = buildMongoServiceChargeRepository(dbServiceCharges);
export const mongoTimeCardRepository = buildMongoTimeCardRepository(dbTimeCards);
export const mongoUnionMemberRepository = buildMongoUnionMemberRepository(dbUnionMembers);
