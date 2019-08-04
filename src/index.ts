import { buildTransactions } from "./transactions";
import { closeConnection, employeeRepository, initConnection } from "./mongo";

const [, , , ...transactionParams] = process.argv;

const transactions = buildTransactions(employeeRepository);

// eslint-disable-next-line @typescript-eslint/no-floating-promises
initConnection()
    .then(async () => {
        // @ts-ignore
        await transactions.addEmployee(...transactionParams);
    })
    .catch(err => {
        console.log("AN ERROR HAS OCCURED");
        console.log({ err });
    })
    .then(async () => closeConnection());
