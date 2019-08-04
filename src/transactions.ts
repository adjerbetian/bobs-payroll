import { EmployeeRepository } from "./repositories";
import { stripQuotationMarks } from "./utils";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function buildTransactions(employeeRepository: EmployeeRepository) {
    return {
        async addEmployee(
            id: string,
            name: string,
            address: string,
            rateType: string,
            rate: string
        ): Promise<void> {
            await employeeRepository.insertOne({
                id: parseInt(id),
                name: stripQuotationMarks(name),
                address: stripQuotationMarks(address),
                rateType: "hourly",
                rate: parseFloat(rate)
            });
        }
    };
}
