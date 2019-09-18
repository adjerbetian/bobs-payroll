import { Routes } from "../../controllers";
import { CoreActions } from "../core";
import { makeControllers } from "./controllers";
import { makePaymentActions } from "./domain";
import { mongoPaymentRepository } from "./mongo";
import { makeRoutes } from "./routes";

export { buildPayment } from "./domain";
export { dbPayments } from "./mongo";

export function makePaymentModule(coreActions: CoreActions): Routes {
    const paymentActions = makePaymentActions({
        coreActions: coreActions,
        paymentRepository: mongoPaymentRepository
    });
    const controllers = makeControllers(paymentActions);
    return makeRoutes(controllers);
}
