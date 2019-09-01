import { CoreActions } from "../../../core";
import { PaymentRepository } from "../../repositories";
import { PaymentActions } from "../PaymentActions";
import { buildComputeEmployeeCommission, buildRunCommissionedPayroll } from "./commissionedPayroll";
import { buildCreatePaymentForEmployee } from "../payment";
import { buildComputeHourlyEmployeePaymentDueAmount, buildRunHourlyPayroll } from "./hourlyPayroll";
import { buildRunPayrollDispatcher } from "./runPayrollDispatcher";
import { buildRunSalariedPayroll } from "./salariedPayroll";

export interface PaymentActionsDependencies {
    coreActions: CoreActions;
    paymentRepository: PaymentRepository;
}

export function buildRunPayroll({
    coreActions,
    paymentRepository
}: PaymentActionsDependencies): PaymentActions["runPayroll"] {
    const createPaymentForEmployee = buildCreatePaymentForEmployee({ coreActions, paymentRepository });
    const computeEmployeeCommission = buildComputeEmployeeCommission({ coreActions });
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
