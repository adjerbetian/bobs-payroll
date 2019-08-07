import { buildApp } from "./app";
import { buildTransactions } from "./core";
import {
    closeConnection,
    employeeRepository,
    initConnection,
    salesReceiptRepository,
    serviceChargeRepository,
    timeCardRepository
} from "./mongo";
import { buildProcessTransaction } from "./processTransaction";

const transactions = buildTransactions({
    salesReceiptRepository,
    employeeRepository,
    serviceChargeRepository,
    timeCardRepository
});
const processTransaction = buildProcessTransaction(transactions);
const app = buildApp({ initConnection, closeConnection, processTransaction });

// eslint-disable-next-line @typescript-eslint/no-floating-promises
app.run().then(() => console.log("done"));
