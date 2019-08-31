import { EmployeeRepository, PaymentMethodRepository, PaymentRepository, TimeCardRepository } from "../../repositories";
import { buildComputeHourlyEmployeePaymentDueAmountAction, buildCreatePaymentForEmployee } from "./actions";
import { buildRunCommissionedPayrollAction } from "./runCommissionedPayroll";
import { buildRunHourlyPayrollAction } from "./runHourlyPayroll";
import { RunPayrollAction } from "./RunPayrollAction";
import { buildRunPayrollDispatcher } from "./runPayrollDispatcher";
import { buildRunSalariedPayrollAction } from "./runSalariedPayroll";

export { RunPayrollAction } from "./RunPayrollAction";

interface Dependencies {
    paymentRepository: PaymentRepository;
    employeeRepository: EmployeeRepository;
    timeCardRepository: TimeCardRepository;
    paymentMethodRepository: PaymentMethodRepository;
}

export function buildRunPayrollAction({
    employeeRepository,
    paymentRepository,
    timeCardRepository,
    paymentMethodRepository
}: Dependencies): RunPayrollAction {
    const createPaymentForEmployee = buildCreatePaymentForEmployee({ paymentRepository, paymentMethodRepository });
    const computeHourlyEmployeePaymentDueAmount = buildComputeHourlyEmployeePaymentDueAmountAction({
        paymentRepository,
        timeCardRepository
    });

    return buildRunPayrollDispatcher({
        runHourlyPayroll: buildRunHourlyPayrollAction({
            employeeRepository,
            computeHourlyEmployeePaymentDueAmount,
            createPaymentForEmployee
        }),
        runSalariedPayroll: buildRunSalariedPayrollAction({
            employeeRepository,
            createPaymentForEmployee
        }),
        runCommissionedPayroll: buildRunCommissionedPayrollAction({
            employeeRepository,
            createPaymentForEmployee
        })
    });
}
