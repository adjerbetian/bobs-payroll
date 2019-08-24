import { stripQuotationMarks } from "../common";
import { Employee, EmployeeType } from "../entities";
import { TransactionFormatError } from "../errors";
import { EmployeeRepository } from "../repositories";
import { Transaction } from "./Transactions";
import { buildTransactionValidator } from "./transactionValidator";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

const transactionValidator = buildTransactionValidator("AddEmp");

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
            transactionValidator.assertIsNotEmpty(id);
            transactionValidator.assertIsNotEmpty(name);
            transactionValidator.assertIsNotEmpty(address);
            transactionValidator.assertIsNotEmpty(type);
            transactionValidator.assertIsNotEmpty(rate);
            transactionValidator.assertIsIncludedIn(type, ["H", "S", "C"]);
            transactionValidator.assertIsTrue(type !== "C" || !!commissionRate);
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
                hourlyRate: args.rate,
                commissionRate: null,
                monthlySalary: null,
                memberId: null
            };
        }

        function buildMonthlySalaryEmployee(): Employee {
            return {
                id: args.id,
                name: args.name,
                address: args.address,
                type: EmployeeType.MONTHLY_SALARY,
                monthlySalary: args.rate,
                commissionRate: null,
                hourlyRate: null,
                memberId: null
            };
        }

        function buildCommissionedEmployee(): Employee {
            return {
                id: args.id,
                name: args.name,
                address: args.address,
                type: EmployeeType.COMMISSIONED,
                monthlySalary: args.rate,
                commissionRate: args.commissionRate,
                hourlyRate: null,
                memberId: null
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
