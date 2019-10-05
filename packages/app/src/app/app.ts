import { buildRouter } from "./router";
import { makeCoreModule, makePaymentModule } from "./modules";
import { closeConnection, initConnection } from "@bobs-payroll/mongo";

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
