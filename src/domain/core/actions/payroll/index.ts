import {
    EmployeeRepository,
    PaymentMethodRepository,
    PaymentRepository,
    SalesReceiptRepository,
    TimeCardRepository
} from "../../repositories";
import {
    buildComputeEmployeeCommission,
    buildComputeHourlyEmployeePaymentDueAmount,
    buildCreatePaymentForEmployee
} from "./actions";
import { buildRunCommissionedPayroll } from "./runCommissionedPayroll";
import { buildRunHourlyPayroll } from "./runHourlyPayroll";
import { RunPayroll } from "./RunPayroll";
import { buildRunPayrollDispatcher } from "./runPayrollDispatcher";
import { buildRunSalariedPayroll } from "./runSalariedPayroll";

export { RunPayroll } from "./RunPayroll";

interface Dependencies {
    paymentRepository: PaymentRepository;
    employeeRepository: EmployeeRepository;
    timeCardRepository: TimeCardRepository;
    paymentMethodRepository: PaymentMethodRepository;
    salesReceiptRepository: SalesReceiptRepository;
}

export function buildRunPayroll({
    employeeRepository,
    paymentRepository,
    timeCardRepository,
    paymentMethodRepository,
    salesReceiptRepository
}: Dependencies): RunPayroll {
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
