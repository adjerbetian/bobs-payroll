import { EmployeeRepository } from "./repositories";
import { stripQuotationMarks } from "./utils";

export interface Transaction {
    addEmployee(
        id: string,
        name: string,
        address: string,
        type: string,
        rate: string
    ): Promise<void>;
}

export function buildTransactions(employeeRepository: EmployeeRepository): Transaction {
    return {
        async addEmployee(
            id: string,
            name: string,
            address: string,
            type: string,
            rate: string
        ): Promise<void> {
            if (type === "H") {
                await employeeRepository.insertOne({
                    id: parseInt(id),
                    name: stripQuotationMarks(name),
                    address: stripQuotationMarks(address),
                    type: "hourly-rate",
                    hourlyRate: parseFloat(rate)
                });
            } else {
                await employeeRepository.insertOne({
                    id: parseInt(id),
                    name: stripQuotationMarks(name),
                    address: stripQuotationMarks(address),
                    type: "monthly-salary",
                    salary: parseFloat(rate)
                });
            }
        }
    };
}
