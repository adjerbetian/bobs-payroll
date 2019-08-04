import { Transaction } from "./Transactions";
import { EmployeeRepository, TimeCardRepository } from "../repositories";
import { EmployeeTypeError } from "../errors";
import * as assert from "assert";
import { TransactionFormatError } from "../errors/TransactionFormatError";
import * as moment from "moment";

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
            assertIsDefined(employeeId);
            assertIsDefined(date);
            assertIsDefined(hours);
            assert(moment(date, "YYYY-MM-DD", true).isValid());
        } catch (err) {
            throw new TransactionFormatError("TimeCard");
        }
    }

    function assertIsDefined(value?: string): void {
        assert(!!value);
    }

    async function assertEmployeeIsInHourlyRate(employeeId: number): Promise<void> {
        const employee = await employeeRepository.fetchEmployeeById(employeeId);
        if (employee.type !== "hourly-rate") {
            throw new EmployeeTypeError(employee, "hourly-rate");
        }
    }
}
