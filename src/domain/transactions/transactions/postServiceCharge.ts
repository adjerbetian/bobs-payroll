import { EmployeeRepository, ServiceCharge, ServiceChargeRepository } from "../../core";
import { Transaction } from "../Transaction";
import { buildTransactionValidator } from "../utils";

interface Dependencies {
    serviceChargeRepository: ServiceChargeRepository;
    employeeRepository: EmployeeRepository;
}
const transactionValidator = buildTransactionValidator("ServiceCharge");

export function buildPostServiceChargeTransaction({
    serviceChargeRepository,
    employeeRepository
}: Dependencies): Transaction {
    return async function(memberId: string, amount: string): Promise<void> {
        assertTransactionValid(memberId, amount);
        await assertUnionMemberExists(memberId);

        const serviceCharge = buildServiceCharge(memberId, amount);
        await serviceChargeRepository.insertOne(serviceCharge);
    };

    function assertTransactionValid(memberId: string, amount: string): void {
        transactionValidator.assertIsNotEmpty(memberId);
        transactionValidator.assertIsNotEmpty(amount);
    }

    async function assertUnionMemberExists(memberId: string): Promise<void> {
        await employeeRepository.fetchByMemberId(memberId);
    }

    function buildServiceCharge(memberId: string, amount: string): ServiceCharge {
        return {
            memberId: memberId,
            amount: parseFloat(amount)
        };
    }
}
