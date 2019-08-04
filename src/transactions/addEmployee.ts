import { EmployeeRepository } from "../repositories";
import { stripQuotationMarks } from "../common/utils";
import { Transaction } from "./Transactions";
import { EmployeeType } from "../entities/Employee";

export function buildAddEmployeeTransaction(employeeRepository: EmployeeRepository): Transaction {
    return async function(
        id: string,
        name: string,
        address: string,
        type: string,
        rate: string,
        commissionRate?: string
    ): Promise<void> {
        if (type === "H") {
            await employeeRepository.insertOne({
                id: parseInt(id),
                name: stripQuotationMarks(name),
                address: stripQuotationMarks(address),
                type: EmployeeType.HOURLY_RATE,
                hourlyRate: parseFloat(rate)
            });
        }
        if (type === "S") {
            await employeeRepository.insertOne({
                id: parseInt(id),
                name: stripQuotationMarks(name),
                address: stripQuotationMarks(address),
                type: EmployeeType.MONTHLY_SALARY,
                monthlySalary: parseFloat(rate)
            });
        }
        if (type === "C") {
            if (!commissionRate) {
                throw new Error("commission rate missing");
            }
            await employeeRepository.insertOne({
                id: parseInt(id),
                name: stripQuotationMarks(name),
                address: stripQuotationMarks(address),
                type: EmployeeType.MONTHLY_SALARY,
                monthlySalary: parseFloat(rate),
                commissionRate: parseFloat(commissionRate)
            });
        }
    };
}
