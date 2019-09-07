import {
    dbEmployees,
    dbPaymentMethods,
    dbPayments,
    dbSalesReceipts,
    dbServiceCharges,
    dbTimeCards,
    dbUnionMembers
} from "./db";
import {
    makeMongoEmployeeRepository,
    makeMongoPaymentMethodRepository,
    makeMongoPaymentRepository,
    makeMongoSalesReceiptRepository,
    makeMongoServiceChargeRepository,
    makeMongoTimeCardRepository,
    makeMongoUnionMemberRepository
} from "./repositories";

export { initConnection, closeConnection, cleanCollections } from "./db";
export { MongoDbAdapter } from "./mongoDbAdapter";

export const mongoEmployeeRepository = makeMongoEmployeeRepository(dbEmployees);
export const mongoPaymentMethodRepository = makeMongoPaymentMethodRepository(dbPaymentMethods);
export const mongoSalesReceiptRepository = makeMongoSalesReceiptRepository(dbSalesReceipts);
export const mongoServiceChargeRepository = makeMongoServiceChargeRepository(dbServiceCharges);
export const mongoTimeCardRepository = makeMongoTimeCardRepository(dbTimeCards);
export const mongoUnionMemberRepository = makeMongoUnionMemberRepository(dbUnionMembers);
export const mongoPaymentRepository = makeMongoPaymentRepository(dbPayments);

export {
    dbEmployees,
    dbTimeCards,
    dbPaymentMethods,
    dbPayments,
    dbSalesReceipts,
    dbServiceCharges,
    dbUnionMembers
} from "./db";

export * from "./DBModels";
