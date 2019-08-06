import * as assert from "assert";
import { assertIsIncludedIn, assertIsNotEmpty, stripQuotationMarks } from "../common/utils";
import { Employee, EmployeeType } from "../entities";
import { TransactionFormatError } from "../errors/TransactionFormatError";
import { EmployeeRepository } from "../repositories";
import { Transaction } from "./Transactions";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function buildAddEmployeeTransaction({ employeeRepository }: Dependencies): Transaction {
    return async function(
        id: string,
        name: string,
        address: string,
        type: string,
        rate: string,
        commissionRate?: string
    ): Promise<void> {
        assertTransactionIsValid();

        await addEmployee({
            id: parseInt(id),
            name: stripQuotationMarks(name),
            address: stripQuotationMarks(address),
            type: type,
            rate: parseFloat(rate),
            commissionRate: commissionRate ? parseFloat(commissionRate) : null
        });

        function assertTransactionIsValid(): void {
            try {
                assertIsNotEmpty(id);
                assertIsNotEmpty(name);
                assertIsNotEmpty(address);
                assertIsNotEmpty(type);
                assertIsNotEmpty(rate);
                assertIsIncludedIn(type, ["H", "S", "C"]);
                assert(type !== "C" || !!commissionRate);
            } catch (err) {
                throw new TransactionFormatError("AddEmp");
            }
        }
    };

    async function addEmployee(args: AddEmployeeArgs): Promise<void> {
        const employee = buildEmployee(args);
        await employeeRepository.insertOne(employee);
    }

    function buildEmployee(args: AddEmployeeArgs): Employee {
        if (args.type === "H") return buildHourlyRateEmployee();
        if (args.type === "S") return buildMonthlySalaryEmployee();
        if (args.type === "C") return buildCommissionedEmployee();
        throw new TransactionFormatError("AddEmp");

        function buildHourlyRateEmployee(): Employee {
            return {
                id: args.id,
                name: args.name,
                address: args.address,
                type: EmployeeType.HOURLY_RATE,
                hourlyRate: args.rate
            };
        }

        function buildMonthlySalaryEmployee(): Employee {
            return {
                id: args.id,
                name: args.name,
                address: args.address,
                type: EmployeeType.MONTHLY_SALARY,
                monthlySalary: args.rate
            };
        }

        function buildCommissionedEmployee(): Employee {
            return {
                id: args.id,
                name: args.name,
                address: args.address,
                type: EmployeeType.COMMISSIONED,
                monthlySalary: args.rate,
                commissionRate: args.commissionRate
            };
        }
    }
}

interface AddEmployeeArgs {
    id: number;
    name: string;
    address: string;
    type: string;
    rate: number;
    commissionRate: number | null;
}
