import { EmployeeRepository, EmployeeType, TimeCard, TimeCardRepository } from "../../core";
import { EmployeeTypeError } from "../errors";
import { Transaction } from "../Transaction";
import { buildTransactionValidator } from "../utils";

interface Dependencies {
    timeCardRepository: TimeCardRepository;
    employeeRepository: EmployeeRepository;
}
const transactionValidator = buildTransactionValidator("TimeCard");

export function buildPostTimeCardTransaction({ timeCardRepository, employeeRepository }: Dependencies): Transaction {
    return async function(employeeId: string, date: string, hours: string): Promise<void> {
        assertTransactionValid(employeeId, date, hours);
        await assertEmployeeIsHourly(employeeId);

        const timeCard = buildTimeCard(employeeId, date, hours);
        await timeCardRepository.insert(timeCard);
    };

    function assertTransactionValid(employeeId: string, date: string, hours: string): void {
        transactionValidator.assertIsNotEmpty(employeeId);
        transactionValidator.assertIsNotEmpty(date);
        transactionValidator.assertIsNotEmpty(hours);
        transactionValidator.assertIsISODate(date);
    }

    async function assertEmployeeIsHourly(employeeId: string): Promise<void> {
        const employee = await employeeRepository.fetchById(parseInt(employeeId));
        if (employee.type !== EmployeeType.HOURLY) {
            throw new EmployeeTypeError(employee, EmployeeType.HOURLY);
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
