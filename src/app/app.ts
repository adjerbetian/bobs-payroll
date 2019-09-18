import { makeTransactionsRouter } from "./controllers";
import { makeCoreActions, makePaymentActions } from "./domain";
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
    const paymentActions = makePaymentActions({
        coreActions,
        paymentRepository: mongoPaymentRepository
    });
    const router = makeTransactionsRouter(coreActions, paymentActions);

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
