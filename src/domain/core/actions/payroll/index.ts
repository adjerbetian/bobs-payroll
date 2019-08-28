import { EmployeeRepository, PaymentMethodRepository, PaymentRepository, TimeCardRepository } from "../../repositories";
import { PayrollActions } from "../runPayroll";
import { buildRunHourlyPayrollAction } from "./runHourlyPayroll";

interface Dependencies {
    paymentRepository: PaymentRepository;
    employeeRepository: EmployeeRepository;
    timeCardRepository: TimeCardRepository;
    paymentMethodRepository: PaymentMethodRepository;
}

export function buildPayrollActions({
    employeeRepository,
    paymentRepository,
    timeCardRepository,
    paymentMethodRepository
}: Dependencies): PayrollActions {
    return {
        runHourlyPayroll: buildRunHourlyPayrollAction({
            paymentRepository,
            employeeRepository,
            timeCardRepository,
            paymentMethodRepository
        })
    };
}
