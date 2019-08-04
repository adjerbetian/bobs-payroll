import { EmployeeRepository } from "./repositories";
import { stripQuotationMarks } from "./utils";

export interface Transaction {
    addEmployee(
        id: string,
        name: string,
        address: string,
        type: string,
        rate: string,
        commissionRate?: string
    ): Promise<void>;
}

export function buildTransactions(employeeRepository: EmployeeRepository): Transaction {
    return {
        async addEmployee(
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
                    type: "hourly-rate",
                    hourlyRate: parseFloat(rate)
                });
            }
            if (type === "S") {
                await employeeRepository.insertOne({
                    id: parseInt(id),
                    name: stripQuotationMarks(name),
                    address: stripQuotationMarks(address),
                    type: "monthly-salary",
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
                    type: "monthly-salary",
                    monthlySalary: parseFloat(rate),
                    commissionRate: parseFloat(commissionRate)
                });
            }
        }
    };
}
