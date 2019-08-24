import { EmployeeRepository, EmployeeType } from "../../core";
import { Transaction } from "../Transaction";
import { buildTransactionValidator } from "../utils";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}
const transactionValidator = buildTransactionValidator("ChgEmp");

export function buildChangeEmployeeTransaction({ employeeRepository }: Dependencies): Transaction {
    return async function(id: string, updateType: string, ...rest: string[]): Promise<void> {
        if (updateType === "Name") {
            const [name] = rest;
            transactionValidator.assertIsNotEmpty(name);
            return employeeRepository.updateById(parseInt(id), { name });
        }
        if (updateType === "Address") {
            const [address] = rest;
            transactionValidator.assertIsNotEmpty(address);
            return employeeRepository.updateById(parseInt(id), { address });
        }
        if (updateType === "Hourly") {
            const [hourlyRate] = rest;
            transactionValidator.assertIsNotEmpty(hourlyRate);
            return employeeRepository.updateById(parseInt(id), {
                type: EmployeeType.HOURLY,
                hourlyRate: parseFloat(hourlyRate)
            });
        }
        if (updateType === "Salaried") {
            const [monthlySalary] = rest;
            transactionValidator.assertIsNotEmpty(monthlySalary);
            return employeeRepository.updateById(parseInt(id), {
                type: EmployeeType.SALARIED,
                monthlySalary: parseFloat(monthlySalary)
            });
        }
        if (updateType === "Commissioned") {
            const [monthlySalary, commissionRate] = rest;
            transactionValidator.assertIsNotEmpty(monthlySalary);
            transactionValidator.assertIsNotEmpty(commissionRate);
            return employeeRepository.updateById(parseInt(id), {
                type: EmployeeType.COMMISSIONED,
                monthlySalary: parseFloat(monthlySalary),
                commissionRate: parseFloat(commissionRate)
            });
        }
    };
}
