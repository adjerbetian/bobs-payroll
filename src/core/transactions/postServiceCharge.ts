import { assertIsNotEmpty } from "../common";
import { ServiceCharge } from "../entities";
import { TransactionFormatError } from "../errors";
import { EmployeeRepository, ServiceChargeRepository } from "../repositories";
import { Transaction } from "./Transactions";

interface Dependencies {
    serviceChargeRepository: ServiceChargeRepository;
    employeeRepository: EmployeeRepository;
}

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
        try {
            assertIsNotEmpty(memberId);
            assertIsNotEmpty(amount);
        } catch (err) {
            throw new TransactionFormatError("ServiceCharge");
        }
    }

    async function assertUnionMemberExists(memberId: string): Promise<void> {
        await employeeRepository.fetchEmployeeByMemberId(memberId);
    }

    function buildServiceCharge(memberId: string, amount: string): ServiceCharge {
        return {
            memberId: memberId,
            amount: parseFloat(amount)
        };
    }
}
