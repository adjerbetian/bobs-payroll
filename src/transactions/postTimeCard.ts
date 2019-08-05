import { Transaction } from "./Transactions";
import { EmployeeRepository, TimeCardRepository } from "../repositories";
import { EmployeeTypeError } from "../errors";
import { TransactionFormatError } from "../errors/TransactionFormatError";
import { EmployeeType } from "../entities/Employee";
import { assertIsISODate, assertIsNotEmpty } from "../common/utils";

export function buildPostTimeCardTransaction({
    timeCardRepository,
    employeeRepository
}: {
    timeCardRepository: TimeCardRepository;
    employeeRepository: EmployeeRepository;
}): Transaction {
    return async function(employeeId: string, date: string, hours: string): Promise<void> {
        assertIsPostTimeCardTransaction(employeeId, date, hours);
        await assertEmployeeIsInHourlyRate(parseInt(employeeId));

        await timeCardRepository.insertOne({
            employeeId: parseInt(employeeId),
            date: date,
            hours: parseFloat(hours)
        });
    };

    function assertIsPostTimeCardTransaction(
        employeeId?: string,
        date?: string,
        hours?: string
    ): void {
        try {
            assertIsNotEmpty(employeeId);
            assertIsNotEmpty(date);
            assertIsNotEmpty(hours);
            assertIsISODate(date);
        } catch (err) {
            throw new TransactionFormatError("TimeCard");
        }
    }

    async function assertEmployeeIsInHourlyRate(employeeId: number): Promise<void> {
        const employee = await employeeRepository.fetchEmployeeById(employeeId);
        if (employee.type !== EmployeeType.HOURLY_RATE) {
            throw new EmployeeTypeError(employee, EmployeeType.HOURLY_RATE);
        }
    }
}
