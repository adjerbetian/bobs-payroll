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
        if (isAddHourlyEmployee(args)) return buildHourlyEmployee(args);
        if (isAddSalariedEmployee(args)) return buildSalariedEmployee(args);
        if (isAddCommissionedEmployee(args)) return buildCommissionedEmployee(args);
        throw new TransactionFormatError("AddEmp");
    }

    function buildHourlyEmployee(args: AddHourlyEmployeeArgs): Employee {
        return {
            ...buildPartialEmployee(args),
            type: EmployeeType.HOURLY,
            hourlyRate: args.rate
        };
    }

    function buildSalariedEmployee(args: AddSalariedEmployeeArgs): Employee {
        return {
            ...buildPartialEmployee(args),
            type: EmployeeType.SALARIED,
            monthlySalary: args.rate
        };
    }

    function buildCommissionedEmployee(args: AddCommissionedEmployeeArgs): Employee {
        return {
            ...buildPartialEmployee(args),
            type: EmployeeType.COMMISSIONED,
            monthlySalary: args.rate,
            commissionRate: args.commissionRate
        };
    }

    function buildPartialEmployee(args: AddEmployeeArgs): Omit<Employee, "type"> {
        return {
            id: args.id,
            name: args.name,
            address: args.address,
            hourlyRate: null,
            monthlySalary: null,
            commissionRate: null,
            memberId: null
        };
    }

    function isAddHourlyEmployee(args: AddEmployeeArgs): args is AddHourlyEmployeeArgs {
        return args.type === "H";
    }

    function isAddSalariedEmployee(args: AddEmployeeArgs): args is AddSalariedEmployeeArgs {
        return args.type === "S";
    }

    function isAddCommissionedEmployee(args: AddEmployeeArgs): args is AddCommissionedEmployeeArgs {
        return args.type === "C";
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

interface AddHourlyEmployeeArgs extends AddEmployeeArgs {
    commissionRate: null;
}

interface AddSalariedEmployeeArgs extends AddEmployeeArgs {
    commissionRate: null;
}

interface AddCommissionedEmployeeArgs extends AddEmployeeArgs {
    commissionRate: number;
}
