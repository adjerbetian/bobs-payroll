import { EmployeeType, TimeCard } from "../entities";
import { EmployeeTypeError } from "../errors";
import { EmployeeRepository, TimeCardRepository } from "../repositories";
import { Transaction } from "./Transactions";
import { buildTransactionValidator } from "./transactionValidator";

interface Dependencies {
    timeCardRepository: TimeCardRepository;
    employeeRepository: EmployeeRepository;
}
const transactionValidator = buildTransactionValidator("TimeCard");

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
        transactionValidator.assertIsNotEmpty(employeeId);
        transactionValidator.assertIsNotEmpty(date);
        transactionValidator.assertIsNotEmpty(hours);
        transactionValidator.assertIsISODate(date);
    }

    async function assertEmployeeIsInHourlyRate(employeeId: string): Promise<void> {
        const employee = await employeeRepository.fetchById(parseInt(employeeId));
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
