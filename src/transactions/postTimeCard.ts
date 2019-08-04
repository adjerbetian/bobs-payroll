import { Transaction } from "./Transactions";
import { EmployeeRepository, TimeCardRepository } from "../repositories";
import { WrongEmployeeTypeError } from "../errors";

export function buildPostTimeCardTransaction({
    timeCardRepository,
    employeeRepository
}: {
    timeCardRepository: TimeCardRepository;
    employeeRepository: EmployeeRepository;
}): Transaction {
    return async function(employeeId: string, date: string, hours: string): Promise<void> {
        const employee = await employeeRepository.fetchEmployeeById(parseInt(employeeId));
        if (employee.type !== "hourly-rate") {
            throw new WrongEmployeeTypeError(employee, "hourly-rate");
        }

        await timeCardRepository.insertOne({
            employeeId: parseInt(employeeId),
            date: date,
            hours: parseFloat(hours)
        });
    };
}
