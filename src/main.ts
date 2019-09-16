/* eslint-disable */
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

Promise.resolve().then(async () => {
    await initConnection();
    // @ts-ignore
    await app.processTransaction(...process.argv.slice(2));
    await closeConnection();
    console.log("done");
});
