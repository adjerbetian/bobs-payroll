import { CoreActions } from "../../../../core";
import { PaymentRepository } from "../../repositories";
import { makeCreatePaymentForEmployee } from "../payment";
import { PaymentActions } from "../PaymentActions";
import { makeRunCommissionedPayroll } from "./commissionedPayroll";
import { makeRunHourlyPayroll } from "./hourlyPayroll";
import { makeRunPayrollDispatcher } from "./runPayrollDispatcher";
import { makeRunSalariedPayroll } from "./salariedPayroll";

export interface PaymentActionsDependencies {
    coreActions: CoreActions;
    paymentRepository: PaymentRepository;
}

export function makeRunPayroll({
    coreActions,
    paymentRepository
}: PaymentActionsDependencies): PaymentActions["runPayroll"] {
    const createPaymentForEmployee = makeCreatePaymentForEmployee({ coreActions, paymentRepository });

    return makeRunPayrollDispatcher({
        runHourlyPayroll: makeRunHourlyPayroll({
            coreActions,
            paymentRepository,
            createPaymentForEmployee
        }),
        runSalariedPayroll: makeRunSalariedPayroll({
            coreActions,
            createPaymentForEmployee
        }),
        runCommissionedPayroll: makeRunCommissionedPayroll({
            coreActions,
            createPaymentForEmployee
        })
    });
}
