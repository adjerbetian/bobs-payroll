import { CoreActions, PaymentMethodRepository, SalesReceiptRepository } from "../../core";
import { PaymentRepository } from "../repositories";
import {
    buildComputeEmployeeCommission,
    buildComputeHourlyEmployeePaymentDueAmount,
    buildCreatePaymentForEmployee
} from "./actions";
import { PaymentActions } from "./PaymentActions";
import { buildRunCommissionedPayroll } from "./runCommissionedPayroll";
import { buildRunHourlyPayroll } from "./runHourlyPayroll";
import { RunPayroll } from "./RunPayroll";
import { buildRunPayrollDispatcher } from "./runPayrollDispatcher";
import { buildRunSalariedPayroll } from "./runSalariedPayroll";

export { PaymentActions } from "./PaymentActions";

export interface PaymentActionsDependencies {
    coreActions: CoreActions;
    paymentRepository: PaymentRepository;
    paymentMethodRepository: PaymentMethodRepository;
    salesReceiptRepository: SalesReceiptRepository;
}

export function buildPaymentActions({
    coreActions,
    paymentRepository,
    paymentMethodRepository,
    salesReceiptRepository
}: PaymentActionsDependencies): PaymentActions {
    return {
        runPayroll: buildRunPayroll()
    };

    function buildRunPayroll(): RunPayroll {
        const createPaymentForEmployee = buildCreatePaymentForEmployee({ paymentRepository, paymentMethodRepository });
        const computeEmployeeCommission = buildComputeEmployeeCommission({ salesReceiptRepository });
        const computeHourlyEmployeePaymentDueAmount = buildComputeHourlyEmployeePaymentDueAmount({
            coreActions,
            paymentRepository
        });

        return buildRunPayrollDispatcher({
            runHourlyPayroll: buildRunHourlyPayroll({
                coreActions,
                computeHourlyEmployeePaymentDueAmount,
                createPaymentForEmployee
            }),
            runSalariedPayroll: buildRunSalariedPayroll({
                coreActions,
                createPaymentForEmployee
            }),
            runCommissionedPayroll: buildRunCommissionedPayroll({
                coreActions,
                createPaymentForEmployee,
                computeEmployeeCommission
            })
        });
    }
}
