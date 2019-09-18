import {
    CommissionedEmployeeCreationModel,
    CoreActions,
    EmployeeCreationModel,
    EmployeeType,
    HourlyEmployeeCreationModel,
    SalariedEmployeeCreationModel
} from "../../../domain";
import { Controllers } from "../../Controllers";
import { TransactionFormatError } from "../../errors";
import { buildTransactionValidator, stripQuotationMarks } from "../utils";

const transactionValidator = buildTransactionValidator("AddEmp");

export function makeAddEmployeeTransaction(actions: CoreActions): Controllers["addEmployee"] {
    return async function(
        id: string,
        name: string,
        address: string,
        type: string,
        rate: string,
        commissionRate?: string
    ) {
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
        const employee = buildEmployeeRequestModel(args);
        await actions.createEmployee(employee);
    }

    function buildEmployeeRequestModel(args: AddEmployeeArgs): EmployeeCreationModel {
        if (isAddHourlyEmployee(args)) return buildHourlyEmployeeRequestModel(args);
        if (isAddSalariedEmployee(args)) return buildSalariedEmployeeRequestModel(args);
        if (isAddCommissionedEmployee(args)) return buildCommissionedEmployeeRequestModel(args);
        throw new TransactionFormatError("AddEmp");
    }

    function buildHourlyEmployeeRequestModel(args: AddHourlyEmployeeArgs): HourlyEmployeeCreationModel {
        return {
            id: args.id,
            name: args.name,
            address: args.address,
            hourlyRate: args.rate,
            type: EmployeeType.HOURLY
        };
    }

    function buildSalariedEmployeeRequestModel(args: AddSalariedEmployeeArgs): SalariedEmployeeCreationModel {
        return {
            id: args.id,
            name: args.name,
            address: args.address,
            salary: args.rate,
            type: EmployeeType.SALARIED
        };
    }

    function buildCommissionedEmployeeRequestModel(
        args: AddCommissionedEmployeeArgs
    ): CommissionedEmployeeCreationModel {
        return {
            id: args.id,
            name: args.name,
            address: args.address,
            salary: args.rate,
            commissionRate: args.commissionRate,
            type: EmployeeType.COMMISSIONED
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
