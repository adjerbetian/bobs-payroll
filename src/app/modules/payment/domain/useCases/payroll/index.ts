import { CoreUseCases } from "../../../../core";
import { PaymentRepository } from "../../repositories";
import { makeCreatePaymentForEmployee } from "../payment";
import { PaymentUseCases } from "../PaymentUseCases";
import { makeRunCommissionedPayroll } from "./commissionedPayroll";
import { makeRunHourlyPayroll } from "./hourlyPayroll";
import { makeRunPayrollDispatcher } from "./runPayrollDispatcher";
import { makeRunSalariedPayroll } from "./salariedPayroll";

export interface PaymentUseCaseDependencies {
    coreUseCases: CoreUseCases;
    paymentRepository: PaymentRepository;
}

export function makeRunPayroll({
    coreUseCases,
    paymentRepository
}: PaymentUseCaseDependencies): PaymentUseCases["runPayroll"] {
    const createPaymentForEmployee = makeCreatePaymentForEmployee({ coreUseCases, paymentRepository });

    return makeRunPayrollDispatcher({
        runHourlyPayroll: makeRunHourlyPayroll({
            coreUseCases,
            paymentRepository,
            createPaymentForEmployee
        }),
        runSalariedPayroll: makeRunSalariedPayroll({
            coreUseCases,
            createPaymentForEmployee
        }),
        runCommissionedPayroll: makeRunCommissionedPayroll({
            coreUseCases,
            createPaymentForEmployee
        })
    });
}
