import { buildApp } from "./domain";
import {
    closeConnection,
    initConnection,
    mongoEmployeeRepository,
    mongoSalesReceiptRepository,
    mongoServiceChargeRepository,
    mongoTimeCardRepository
} from "./mongo";

const app = buildApp({
    salesReceiptRepository: mongoSalesReceiptRepository,
    employeeRepository: mongoEmployeeRepository,
    serviceChargeRepository: mongoServiceChargeRepository,
    timeCardRepository: mongoTimeCardRepository
});

// eslint-disable-next-line @typescript-eslint/no-floating-promises
Promise.resolve().then(async () => {
    await initConnection();
    await app.processTransaction(process.argv.slice(2));
    await closeConnection();
    console.log("done");
});
