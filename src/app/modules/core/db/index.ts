import {
    dbEmployees,
    dbPaymentMethods,
    dbSalesReceipts,
    dbServiceCharges,
    dbTimeCards,
    dbUnionMembers
} from "./collections";
import {
    makeMongoEmployeeRepository,
    makeMongoPaymentMethodRepository,
    makeMongoSalesReceiptRepository,
    makeMongoServiceChargeRepository,
    makeMongoTimeCardRepository,
    makeMongoUnionMemberRepository
} from "./repositories";

export * from "./collections";

export const mongoEmployeeRepository = makeMongoEmployeeRepository(dbEmployees);
export const mongoPaymentMethodRepository = makeMongoPaymentMethodRepository(dbPaymentMethods);
export const mongoSalesReceiptRepository = makeMongoSalesReceiptRepository(dbSalesReceipts);
export const mongoServiceChargeRepository = makeMongoServiceChargeRepository(dbServiceCharges);
export const mongoTimeCardRepository = makeMongoTimeCardRepository(dbTimeCards);
export const mongoUnionMemberRepository = makeMongoUnionMemberRepository(dbUnionMembers);
