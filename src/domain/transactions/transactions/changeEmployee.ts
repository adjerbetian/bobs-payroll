import { CoreActions, EmployeeType, PaymentMethodType } from "../../core";
import { Transaction } from "../Transaction";
import { buildTransactionValidator } from "../utils";

const transactionValidator = buildTransactionValidator("ChgEmp");

export function buildChangeEmployeeTransaction(actions: CoreActions): Transaction {
    return async function(id: string, updateType: string, ...params: string[]): Promise<void> {
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

            await actions.updateEmployee(employeeId, { name });
        }

        async function changeEmployeeAddress(): Promise<void> {
            const [address] = params;
            transactionValidator.assertIsNotEmpty(address);

            return actions.updateEmployee(employeeId, { address });
        }

        async function changeEmployeeTypeToHourly(): Promise<void> {
            const [hourlyRate] = params;
            transactionValidator.assertIsNotEmpty(hourlyRate);

            return actions.updateEmployee(employeeId, {
                work: {
                    type: EmployeeType.HOURLY,
                    hourlyRate: parseFloat(hourlyRate)
                }
            });
        }

        async function changeEmployeeTypeToSalaried(): Promise<void> {
            const [monthlySalary] = params;
            transactionValidator.assertIsNotEmpty(monthlySalary);

            return actions.updateEmployee(employeeId, {
                work: {
                    type: EmployeeType.SALARIED,
                    monthlySalary: parseFloat(monthlySalary)
                }
            });
        }

        async function changeEmployeeTypeToCommissioned(): Promise<void> {
            const [monthlySalary, commissionRate] = params;
            transactionValidator.assertIsNotEmpty(monthlySalary);
            transactionValidator.assertIsNotEmpty(commissionRate);

            return actions.updateEmployee(employeeId, {
                work: {
                    type: EmployeeType.COMMISSIONED,
                    monthlySalary: parseFloat(monthlySalary),
                    commissionRate: parseFloat(commissionRate)
                }
            });
        }

        async function changeEmployeePaymentMethodToHold(): Promise<void> {
            await actions.createPaymentMethod({
                type: PaymentMethodType.HOLD,
                employeeId: employeeId
            });
        }

        async function changeEmployeePaymentMethodToDirect(): Promise<void> {
            const [bank, account] = params;
            transactionValidator.assertIsNotEmpty(bank);
            transactionValidator.assertIsNotEmpty(account);

            await actions.createPaymentMethod({
                type: PaymentMethodType.DIRECT,
                employeeId: employeeId,
                account,
                bank
            });
        }

        async function changeEmployeePaymentMethodToMail(): Promise<void> {
            const [address] = params;
            transactionValidator.assertIsNotEmpty(address);

            await actions.createPaymentMethod({
                type: PaymentMethodType.MAIL,
                employeeId: employeeId,
                address
            });
        }

        async function changeEmployeeToJoinUnion(): Promise<void> {
            const [memberId, , rate] = params;
            transactionValidator.assertIsNotEmpty(rate);

            return actions.createUnionMember({
                employeeId,
                memberId,
                rate: parseFloat(rate)
            });
        }

        async function removeEmployeeFromUnion(): Promise<void> {
            return actions.removeEmployeeFromUnion(employeeId);
        }
    };
}
