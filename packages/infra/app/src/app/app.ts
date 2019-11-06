import { makeCoreModule } from "@payroll/core";
import { makePaymentModule } from "@payroll/payment";
import { closeConnection, initConnection } from "@payroll/mongo";
import { buildRouter } from "../router";

interface App {
    start: () => Promise<void>;
    stop: () => Promise<void>;
    processCommand: (...args: string[]) => Promise<void>;
}

export function buildApp(): App {
    const router = buildRouter(console);

    const coreModule = makeCoreModule();
    const paymentModule = makePaymentModule(coreModule.useCases);

    router.addRoutes(coreModule.routes);
    router.addRoutes(paymentModule.routes);

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