import { assertIsISODate, assertIsNotEmpty } from "../common/utils";
import { EmployeeType, TimeCard } from "../entities";
import { EmployeeTypeError, TransactionFormatError } from "../errors";
import { EmployeeRepository, TimeCardRepository } from "../repositories";
import { Transaction } from "./Transactions";

interface Dependencies {
    timeCardRepository: TimeCardRepository;
    employeeRepository: EmployeeRepository;
}

export function buildPostTimeCardTransaction({
    timeCardRepository,
    employeeRepository
}: Dependencies): Transaction {
    return async function(employeeId: string, date: string, hours: string): Promise<void> {
        assertTransactionValid(employeeId, date, hours);
        await assertEmployeeIsInHourlyRate(employeeId);

        const timeCard = buildTimeCard(employeeId, date, hours);
        await timeCardRepository.insertOne(timeCard);
    };

    function assertTransactionValid(employeeId: string, date: string, hours: string): void {
        try {
            assertIsNotEmpty(employeeId);
            assertIsNotEmpty(date);
            assertIsNotEmpty(hours);
            assertIsISODate(date);
        } catch (err) {
            throw new TransactionFormatError("TimeCard");
        }
    }

    async function assertEmployeeIsInHourlyRate(employeeId: string): Promise<void> {
        const employee = await employeeRepository.fetchEmployeeById(parseInt(employeeId));
        if (employee.type !== EmployeeType.HOURLY_RATE) {
            throw new EmployeeTypeError(employee, EmployeeType.HOURLY_RATE);
        }
    }

    function buildTimeCard(employeeId: string, date: string, hours: string): TimeCard {
        return {
            employeeId: parseInt(employeeId),
            date: date,
            hours: parseFloat(hours)
        };
    }
}
