import { Routes } from "@payroll/common";
import { CoreUseCases } from "@modules/core";
import { makeControllers } from "./controllers";
import { makePaymentUseCases, PaymentUseCases } from "./domain";
import { mongoPaymentRepository } from "./db";
import { makeRoutes } from "./routes";

export { buildPayment } from "./domain";
export { dbPayments } from "./db";

interface PaymentModule {
    routes: Routes;
    useCases: PaymentUseCases;
}

export function makePaymentModule(coreUseCases: CoreUseCases): PaymentModule {
    const paymentUseCases = makePaymentUseCases({
        coreUseCases: coreUseCases,
        paymentRepository: mongoPaymentRepository
    });
    const controllers = makeControllers(paymentUseCases);

    return {
        routes: makeRoutes(controllers),
        useCases: paymentUseCases
    };
}
