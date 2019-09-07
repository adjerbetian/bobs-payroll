import { CoreActions } from "../../../core";
import { PaymentRepository } from "../../repositories";
import { PaymentActions } from "../PaymentActions";
import { makeComputeEmployeeCommission, makeRunCommissionedPayroll } from "./commissionedPayroll";
import { makeCreatePaymentForEmployee } from "../payment";
import { makeComputeHourlyEmployeePaymentDueAmount, makeRunHourlyPayroll } from "./hourlyPayroll";
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
    const computeEmployeeCommission = makeComputeEmployeeCommission({ coreActions });
    const computeHourlyEmployeePaymentDueAmount = makeComputeHourlyEmployeePaymentDueAmount({
        coreActions,
        paymentRepository
    });

    return makeRunPayrollDispatcher({
        runHourlyPayroll: makeRunHourlyPayroll({
            coreActions,
            computeHourlyEmployeePaymentDueAmount,
            createPaymentForEmployee
        }),
        runSalariedPayroll: makeRunSalariedPayroll({
            coreActions,
            createPaymentForEmployee
        }),
        runCommissionedPayroll: makeRunCommissionedPayroll({
            coreActions,
            createPaymentForEmployee,
            computeEmployeeCommission
        })
    });
}
