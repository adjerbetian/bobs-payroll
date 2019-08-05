import { EmployeeRepository } from "../repositories";
import { assertIsNotEmpty, stripQuotationMarks } from "../common/utils";
import { Transaction } from "./Transactions";
import { EmployeeType } from "../entities/Employee";
import * as assert from "assert";
import { TransactionFormatError } from "../errors/TransactionFormatError";

interface AddEmployeeArgs {
    id: number;
    name: string;
    address: string;
    type: string;
    rate: number;
    commissionRate: number | null;
}

export function buildAddEmployeeTransaction(employeeRepository: EmployeeRepository): Transaction {
    return async function(...rawArgs: string[]): Promise<void> {
        assertIsAddEmpTransaction(rawArgs);

        const args = convertArgs(rawArgs);
        await addEmployee({
            id: parseInt(args.id),
            name: stripQuotationMarks(args.name),
            address: stripQuotationMarks(args.address),
            type: args.type,
            rate: parseFloat(args.rate),
            commissionRate: args.commissionRate ? parseFloat(args.commissionRate) : null
        });
    };

    function assertIsAddEmpTransaction(rawArgs: string[]): void {
        const args = convertArgs(rawArgs);
        try {
            assertIsNotEmpty(args.id);
            assertIsNotEmpty(args.name);
            assertIsNotEmpty(args.address);
            assertIsNotEmpty(args.type);
            assertIsNotEmpty(args.rate);
            assert(["H", "S", "C"].includes(args.type || ""));
            assert(args.type !== "C" || !!args.commissionRate);
        } catch (err) {
            throw new TransactionFormatError("AddEmp");
        }
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function convertArgs(args: string[]) {
        return {
            id: args[0],
            name: args[1],
            address: args[2],
            type: args[3],
            rate: args[4],
            commissionRate: args[5] || null
        };
    }

    async function addEmployee(args: AddEmployeeArgs): Promise<void> {
        if (args.type === "H") {
            await employeeRepository.insertOne({
                id: args.id,
                name: args.name,
                address: args.address,
                type: EmployeeType.HOURLY_RATE,
                hourlyRate: args.rate
            });
        }
        if (args.type === "S") {
            await employeeRepository.insertOne({
                id: args.id,
                name: args.name,
                address: args.address,
                type: EmployeeType.MONTHLY_SALARY,
                monthlySalary: args.rate
            });
        }
        if (args.type === "C") {
            await employeeRepository.insertOne({
                id: args.id,
                name: args.name,
                address: args.address,
                type: EmployeeType.COMMISSIONED,
                monthlySalary: args.rate,
                commissionRate: args.commissionRate
            });
        }
    }
}
