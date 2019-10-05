import { buildTransactionValidator } from "../../../../router";
import { CoreUseCases, EmployeeType, PaymentMethodType } from "../../domain";
import { Controllers } from "../Controllers";

const transactionValidator = buildTransactionValidator("ChgEmp");

export function makeChangeEmployeeController(useCases: CoreUseCases): Controllers["changeEmployee"] {
    return async function(id: string, updateType: string, ...params: string[]) {
        const employeeId = parseInt(id);

        if (updateType === "Name") return changeEmployeeName();
        if (updateType === "Address") return changeEmployeeAddress();
        if (updateType === "Hourly") return changeEmployeeTypeToHourly();
        if (updateType === "Salaried") return changeEmployeeTypeToSalaried();
        if (updateType === "Commissioned") return changeEmployeeTypeToCommissioned();
        if (updateType === "Hold") return changeEmployeePaymentMethodToHold();
        if (updateType === "Direct") return changeEmployeePaymentMethodToDirect();
        if (updateType === "Mail") return changeEmployeePaymentMethodToMail();
        if (updateType === "Member") return changeEmployeeToJoinUnion();
        if (updateType === "NoMember") return removeEmployeeFromUnion();

        async function changeEmployeeName(): Promise<void> {
            const [name] = params;
            transactionValidator.assertIsNotEmpty(name);

            await useCases.updateEmployee(employeeId, { name });
        }

        async function changeEmployeeAddress(): Promise<void> {
            const [address] = params;
            transactionValidator.assertIsNotEmpty(address);

            return useCases.updateEmployee(employeeId, { address });
        }

        async function changeEmployeeTypeToHourly(): Promise<void> {
            const [hourlyRate] = params;
            transactionValidator.assertIsNotEmpty(hourlyRate);

            return useCases.updateEmployee(employeeId, {
                type: EmployeeType.HOURLY,
                hourlyRate: parseFloat(hourlyRate)
            });
        }

        async function changeEmployeeTypeToSalaried(): Promise<void> {
            const [monthlySalary] = params;
            transactionValidator.assertIsNotEmpty(monthlySalary);

            return useCases.updateEmployee(employeeId, {
                type: EmployeeType.SALARIED,
                salary: parseFloat(monthlySalary)
            });
        }

        async function changeEmployeeTypeToCommissioned(): Promise<void> {
            const [monthlySalary, commissionRate] = params;
            transactionValidator.assertIsNotEmpty(monthlySalary);
            transactionValidator.assertIsNotEmpty(commissionRate);

            return useCases.updateEmployee(employeeId, {
                type: EmployeeType.COMMISSIONED,
                salary: parseFloat(monthlySalary),
                commissionRate: parseFloat(commissionRate)
            });
        }

        async function changeEmployeePaymentMethodToHold(): Promise<void> {
            await useCases.createPaymentMethod({
                employeeId: employeeId,
                type: PaymentMethodType.HOLD
            });
        }

        async function changeEmployeePaymentMethodToDirect(): Promise<void> {
            const [bank, account] = params;
            transactionValidator.assertIsNotEmpty(bank);
            transactionValidator.assertIsNotEmpty(account);

            await useCases.createPaymentMethod({
                employeeId: employeeId,
                type: PaymentMethodType.DIRECT,
                account,
                bank
            });
        }

        async function changeEmployeePaymentMethodToMail(): Promise<void> {
            const [address] = params;
            transactionValidator.assertIsNotEmpty(address);

            await useCases.createPaymentMethod({
                employeeId: employeeId,
                type: PaymentMethodType.MAIL,
                address
            });
        }

        async function changeEmployeeToJoinUnion(): Promise<void> {
            const [memberId, , rate] = params;
            transactionValidator.assertIsNotEmpty(rate);

            return useCases.createUnionMembership({
                employeeId,
                memberId,
                rate: parseFloat(rate)
            });
        }

        async function removeEmployeeFromUnion(): Promise<void> {
            return useCases.removeEmployeeFromUnion(employeeId);
        }
    };
}
