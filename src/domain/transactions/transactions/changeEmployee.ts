import { EmployeeRepository, EmployeeType, PaymentMethodRepository, PaymentMethodType } from "../../core";
import { Transaction } from "../Transaction";
import { buildTransactionValidator } from "../utils";

interface Dependencies {
    employeeRepository: EmployeeRepository;
    paymentMethodRepository: PaymentMethodRepository;
}
const transactionValidator = buildTransactionValidator("ChgEmp");

export function buildChangeEmployeeTransaction({
    employeeRepository,
    paymentMethodRepository
}: Dependencies): Transaction {
    return async function(id: string, updateType: string, ...rest: string[]): Promise<void> {
        const employeeId = parseInt(id);

        if (updateType === "Name") {
            const [name] = rest;
            transactionValidator.assertIsNotEmpty(name);
            return employeeRepository.updateById(employeeId, { name });
        }
        if (updateType === "Address") {
            const [address] = rest;
            transactionValidator.assertIsNotEmpty(address);
            return employeeRepository.updateById(employeeId, { address });
        }
        if (updateType === "Hourly") {
            const [hourlyRate] = rest;
            transactionValidator.assertIsNotEmpty(hourlyRate);
            return employeeRepository.updateById(employeeId, {
                type: EmployeeType.HOURLY,
                hourlyRate: parseFloat(hourlyRate)
            });
        }
        if (updateType === "Salaried") {
            const [monthlySalary] = rest;
            transactionValidator.assertIsNotEmpty(monthlySalary);
            return employeeRepository.updateById(employeeId, {
                type: EmployeeType.SALARIED,
                monthlySalary: parseFloat(monthlySalary)
            });
        }
        if (updateType === "Commissioned") {
            const [monthlySalary, commissionRate] = rest;
            transactionValidator.assertIsNotEmpty(monthlySalary);
            transactionValidator.assertIsNotEmpty(commissionRate);
            return employeeRepository.updateById(employeeId, {
                type: EmployeeType.COMMISSIONED,
                monthlySalary: parseFloat(monthlySalary),
                commissionRate: parseFloat(commissionRate)
            });
        }
        if (updateType === "Hold") {
            await paymentMethodRepository.deleteByEmployeeId(employeeId);
            return paymentMethodRepository.insertOne({
                type: PaymentMethodType.HOLD,
                employeeId: employeeId
            });
        }
    };
}
