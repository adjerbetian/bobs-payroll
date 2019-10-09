import { Routes } from "@payroll/common";
import { makeControllers } from "./controllers";
import { CoreUseCases, makeCoreUseCases } from "./domain";
import {
    mongoEmployeeRepository,
    mongoPaymentMethodRepository,
    mongoSalesReceiptRepository,
    mongoServiceChargeRepository,
    mongoTimeCardRepository,
    mongoUnionMembershipRepository
} from "./db";
import { makeRoutes } from "./routes";

export * from "./domain";
export * from "./db";

interface CoreModule {
    routes: Routes;
    useCases: CoreUseCases;
}

export function makeCoreModule(): CoreModule {
    const coreUseCases = makeCoreUseCases({
        timeCardRepository: mongoTimeCardRepository,
        serviceChargeRepository: mongoServiceChargeRepository,
        salesReceiptRepository: mongoSalesReceiptRepository,
        paymentMethodRepository: mongoPaymentMethodRepository,
        employeeRepository: mongoEmployeeRepository,
        unionMembershipRepository: mongoUnionMembershipRepository
    });
    const controllers = makeControllers(coreUseCases);
    return {
        useCases: coreUseCases,
        routes: makeRoutes(controllers)
    };
}
