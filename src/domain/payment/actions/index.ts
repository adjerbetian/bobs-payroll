import { EmployeeRepository, PaymentMethodRepository, SalesReceiptRepository, TimeCardRepository } from "../../core";
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

interface Dependencies {
    paymentRepository: PaymentRepository;
    employeeRepository: EmployeeRepository;
    timeCardRepository: TimeCardRepository;
    paymentMethodRepository: PaymentMethodRepository;
    salesReceiptRepository: SalesReceiptRepository;
}

export function buildPaymentActions({
    employeeRepository,
    paymentRepository,
    timeCardRepository,
    paymentMethodRepository,
    salesReceiptRepository
}: Dependencies): PaymentActions {
    return {
        runPayroll: buildRunPayroll()
    };

    function buildRunPayroll(): RunPayroll {
        const createPaymentForEmployee = buildCreatePaymentForEmployee({ paymentRepository, paymentMethodRepository });
        const computeEmployeeCommission = buildComputeEmployeeCommission({ salesReceiptRepository });
        const computeHourlyEmployeePaymentDueAmount = buildComputeHourlyEmployeePaymentDueAmount({
            paymentRepository,
            timeCardRepository
        });

        return buildRunPayrollDispatcher({
            runHourlyPayroll: buildRunHourlyPayroll({
                employeeRepository,
                computeHourlyEmployeePaymentDueAmount,
                createPaymentForEmployee
            }),
            runSalariedPayroll: buildRunSalariedPayroll({
                employeeRepository,
                createPaymentForEmployee
            }),
            runCommissionedPayroll: buildRunCommissionedPayroll({
                employeeRepository,
                createPaymentForEmployee,
                computeEmployeeCommission
            })
        });
    }
}
