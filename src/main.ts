import { buildApp } from "./domain";
import {
    closeConnection,
    initConnection,
    mongoEmployeeRepository,
    mongoPaymentMethodRepository,
    mongoPaymentRepository,
    mongoSalesReceiptRepository,
    mongoServiceChargeRepository,
    mongoTimeCardRepository,
    mongoUnionMemberRepository
} from "./mongo";

const app = buildApp({
    salesReceiptRepository: mongoSalesReceiptRepository,
    employeeRepository: mongoEmployeeRepository,
    serviceChargeRepository: mongoServiceChargeRepository,
    timeCardRepository: mongoTimeCardRepository,
    paymentMethodRepository: mongoPaymentMethodRepository,
    unionMemberRepository: mongoUnionMemberRepository,
    paymentRepository: mongoPaymentRepository
});

// eslint-disable-next-line @typescript-eslint/no-floating-promises
Promise.resolve().then(async () => {
    await initConnection();
    await app.processTransaction(process.argv.slice(2));
    await closeConnection();
    console.log("done");
});
