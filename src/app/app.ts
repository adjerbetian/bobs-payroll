import { makeTransactionsRouter } from "./controllers";
import { makeCoreActions } from "./domain";
import { makePaymentModule } from "./modules";
import {
    closeConnection,
    initConnection,
    mongoEmployeeRepository,
    mongoPaymentMethodRepository,
    mongoSalesReceiptRepository,
    mongoServiceChargeRepository,
    mongoTimeCardRepository,
    mongoUnionMemberRepository
} from "./mongo";

interface App {
    start: () => Promise<void>;
    stop: () => Promise<void>;
    processCommand: (...args: string[]) => Promise<void>;
}

export function buildApp(): App {
    const coreActions = makeCoreActions({
        employeeRepository: mongoEmployeeRepository,
        paymentMethodRepository: mongoPaymentMethodRepository,
        salesReceiptRepository: mongoSalesReceiptRepository,
        serviceChargeRepository: mongoServiceChargeRepository,
        timeCardRepository: mongoTimeCardRepository,
        unionMemberRepository: mongoUnionMemberRepository
    });
    const router = makeTransactionsRouter(coreActions);
    router.addRoutes(makePaymentModule(coreActions));

    return {
        async start() {
            await initConnection();
        },
        async stop() {
            return closeConnection();
        },
        async processCommand(...args) {
            return router.processCommand(...args);
        }
    };
}
