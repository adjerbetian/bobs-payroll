import { Routes } from "../../router";
import { CoreActions } from "../core";
import { makeControllers } from "./controllers";
import { makePaymentActions, PaymentActions } from "./domain";
import { mongoPaymentRepository } from "./db";
import { makeRoutes } from "./routes";

export { buildPayment } from "./domain";
export { dbPayments } from "./db";

interface PaymentModule {
    routes: Routes;
    actions: PaymentActions;
}

export function makePaymentModule(coreActions: CoreActions): PaymentModule {
    const paymentActions = makePaymentActions({
        coreActions: coreActions,
        paymentRepository: mongoPaymentRepository
    });
    const controllers = makeControllers(paymentActions);

    return {
        routes: makeRoutes(controllers),
        actions: paymentActions
    };
}
