import {
    dbEmployees,
    dbPaymentMethods,
    dbPayments,
    dbSalesReceipts,
    dbServiceCharges,
    dbTimeCards,
    dbUnionMembers
} from "./databases";
import {
    makeMongoEmployeeRepository,
    makeMongoPaymentMethodRepository,
    makeMongoPaymentRepository,
    makeMongoSalesReceiptRepository,
    makeMongoServiceChargeRepository,
    makeMongoTimeCardRepository,
    makeMongoUnionMemberRepository
} from "./repositories";

export * from "./databases";
export * from "./DBModels";
export * from "./mappers";

export const mongoEmployeeRepository = makeMongoEmployeeRepository(dbEmployees);
export const mongoPaymentMethodRepository = makeMongoPaymentMethodRepository(dbPaymentMethods);
export const mongoSalesReceiptRepository = makeMongoSalesReceiptRepository(dbSalesReceipts);
export const mongoServiceChargeRepository = makeMongoServiceChargeRepository(dbServiceCharges);
export const mongoTimeCardRepository = makeMongoTimeCardRepository(dbTimeCards);
export const mongoUnionMemberRepository = makeMongoUnionMemberRepository(dbUnionMembers);
export const mongoPaymentRepository = makeMongoPaymentRepository(dbPayments);
