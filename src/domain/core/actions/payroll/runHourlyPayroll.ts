import { EmployeeRepository, PaymentMethodRepository, PaymentRepository, TimeCardRepository } from "../../repositories";
import { RunPayrollAction } from "../runPayroll";

interface Dependencies {
    paymentRepository: PaymentRepository;
    employeeRepository: EmployeeRepository;
    timeCardRepository: TimeCardRepository;
    paymentMethodRepository: PaymentMethodRepository;
}

export function buildRunHourlyPayrollAction({  }: Dependencies): RunPayrollAction {
    return async function(date: string): Promise<void> {
        throw new Error("todo");
    };
}
