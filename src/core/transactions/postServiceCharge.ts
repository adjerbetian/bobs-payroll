import { assertIsNotEmpty } from "../common";
import { ServiceCharge } from "../entities";
import { TransactionFormatError, UnionMemberError } from "../errors";
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
    return async function(employeeId: string, amount: string): Promise<void> {
        assertTransactionValid(employeeId, amount);
        await assertEmployeeIsAUnionMember(employeeId);

        const serviceCharge = buildServiceCharge(employeeId, amount);
        await serviceChargeRepository.insertOne(serviceCharge);
    };

    function assertTransactionValid(employeeId: string, amount: string): void {
        try {
            assertIsNotEmpty(employeeId);
            assertIsNotEmpty(amount);
        } catch (err) {
            throw new TransactionFormatError("ServiceCharge");
        }
    }

    async function assertEmployeeIsAUnionMember(employeeId: string): Promise<void> {
        const employee = await employeeRepository.fetchEmployeeById(parseInt(employeeId));
        // if (!employee.union) {
        //     throw new UnionMemberError(employee);
        // }
    }

    function buildServiceCharge(employeeId: string, amount: string): ServiceCharge {
        return {
            memberId: "coucou",
            amount: parseFloat(amount)
        };
    }
}
