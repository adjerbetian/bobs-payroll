import { Routes } from "../../router";
import { makeControllers } from "./controllers";
import { CoreActions, makeCoreActions } from "./domain";
import {
    mongoEmployeeRepository,
    mongoPaymentMethodRepository,
    mongoSalesReceiptRepository,
    mongoServiceChargeRepository,
    mongoTimeCardRepository,
    mongoUnionMemberRepository
} from "./mongo";
import { makeRoutes } from "./routes";

export * from "./domain";
export * from "./mongo";

interface CoreModule {
    routes: Routes;
    actions: CoreActions;
}

export function makeCoreModule(): CoreModule {
    const coreActions = makeCoreActions({
        timeCardRepository: mongoTimeCardRepository,
        serviceChargeRepository: mongoServiceChargeRepository,
        salesReceiptRepository: mongoSalesReceiptRepository,
        paymentMethodRepository: mongoPaymentMethodRepository,
        employeeRepository: mongoEmployeeRepository,
        unionMemberRepository: mongoUnionMemberRepository
    });
    const controllers = makeControllers(coreActions);
    return {
        actions: coreActions,
        routes: makeRoutes(controllers)
    };
}
