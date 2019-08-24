import { buildApp } from "./app";
import { buildTransactionDomain } from "./domain";
import {
    closeConnection,
    mongoEmployeeRepository,
    initConnection,
    mongoSalesReceiptRepository,
    mongoServiceChargeRepository,
    mongoTimeCardRepository
} from "./mongo";

const transactionDomain = buildTransactionDomain({
    salesReceiptRepository: mongoSalesReceiptRepository,
    employeeRepository: mongoEmployeeRepository,
    serviceChargeRepository: mongoServiceChargeRepository,
    timeCardRepository: mongoTimeCardRepository
});
const app = buildApp({ initConnection, closeConnection, processTransaction: transactionDomain.processTransaction });

// eslint-disable-next-line @typescript-eslint/no-floating-promises
app.run().then(() => console.log("done"));
