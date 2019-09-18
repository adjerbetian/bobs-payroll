import {
    buildCommissionedEmployee,
    buildHourlyEmployee,
    buildSalariedEmployee,
    CommissionedEmployee,
    CoreActions,
    Employee,
    HourlyEmployee,
    SalariedEmployee
} from "../../../domain";
import { TransactionFormatError } from "../../errors";
import { Transactions } from "../processTransaction";
import { buildTransactionValidator, stripQuotationMarks } from "../utils";

const transactionValidator = buildTransactionValidator("AddEmp");

export function makeAddEmployeeTransaction(actions: CoreActions): Transactions["addEmployee"] {
    return async function(id, name, address, type, rate, commissionRate?) {
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
        await actions.createEmployee(employee);
    }

    function buildEmployee(args: AddEmployeeArgs): Employee {
        if (isAddHourlyEmployee(args)) return buildHourlyEmployeeFromArgs(args);
        if (isAddSalariedEmployee(args)) return buildSalariedEmployeeFromArgs(args);
        if (isAddCommissionedEmployee(args)) return buildCommissionedEmployeeFromArgs(args);
        throw new TransactionFormatError("AddEmp");
    }

    function buildHourlyEmployeeFromArgs(args: AddHourlyEmployeeArgs): HourlyEmployee {
        return buildHourlyEmployee({
            id: args.id,
            name: args.name,
            address: args.address,
            hourlyRate: args.rate
        });
    }

    function buildSalariedEmployeeFromArgs(args: AddSalariedEmployeeArgs): SalariedEmployee {
        return buildSalariedEmployee({
            id: args.id,
            name: args.name,
            address: args.address,
            salary: args.rate
        });
    }

    function buildCommissionedEmployeeFromArgs(args: AddCommissionedEmployeeArgs): CommissionedEmployee {
        return buildCommissionedEmployee({
            id: args.id,
            name: args.name,
            address: args.address,
            salary: args.rate,
            commissionRate: args.commissionRate
        });
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
