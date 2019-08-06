import { closeConnection, employeeRepository, initConnection } from "./mongo";
import { buildProcessTransaction } from "./processTransaction";
import { buildTransactions } from "./transactions";

const [, , ...transactionParams] = process.argv;

const transactions = buildTransactions(employeeRepository);
const processTransaction = buildProcessTransaction(transactions);

// eslint-disable-next-line @typescript-eslint/no-floating-promises
initConnection()
    .then(async () => {
        await processTransaction(...transactionParams);
    })
    .catch(err => {
        console.log("AN ERROR HAS OCCURED");
        console.log({ err });
    })
    .then(async () => closeConnection());
