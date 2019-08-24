import { EmployeeType } from "../entities";
import { EmployeeRepository } from "../repositories";
import { Transaction } from "./Transactions";
import { buildTransactionValidator } from "./transactionValidator";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}
const transactionValidator = buildTransactionValidator("ChgEmp");

export function buildChangeEmployeeTransaction({ employeeRepository }: Dependencies): Transaction {
    return async function(id: string, updateType: string, ...rest: string[]): Promise<void> {
        if (updateType === "Name") {
            const [name] = rest;
            return employeeRepository.updateById(parseInt(id), { name });
        }
        if (updateType === "Address") {
            const [address] = rest;
            return employeeRepository.updateById(parseInt(id), { address });
        }
        if (updateType === "Hourly") {
            const [hourlyRate] = rest;
            transactionValidator.assertIsNotEmpty(hourlyRate);
            return employeeRepository.updateById(parseInt(id), {
                type: EmployeeType.HOURLY_RATE,
                hourlyRate: parseFloat(hourlyRate),
                monthlySalary: undefined,
                commissionRate: undefined
            });
        }
    };
}
