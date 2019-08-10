import { ServiceCharge } from "../entities";
import { UnionMemberError } from "../errors";
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
        // assertTransactionValid(employeeId, date, hours);
        await assertEmployeeIsAUnionMember(employeeId);

        const serviceCharge = buildServiceCharge(employeeId, amount);
        await serviceChargeRepository.insertOne(serviceCharge);
    };

    // function assertTransactionValid(employeeId: string, date: string, hours: string): void {
    //     try {
    //         assertIsNotEmpty(employeeId);
    //         assertIsNotEmpty(date);
    //         assertIsNotEmpty(hours);
    //         assertIsISODate(date);
    //     } catch (err) {
    //         throw new TransactionFormatError("TimeCard");
    //     }
    // }
    //
    async function assertEmployeeIsAUnionMember(employeeId: string): Promise<void> {
        const employee = await employeeRepository.fetchEmployeeById(parseInt(employeeId));
        if (!employee.union) {
            throw new UnionMemberError(employee);
        }
    }

    function buildServiceCharge(employeeId: string, amount: string): ServiceCharge {
        return {
            employeeId: parseInt(employeeId),
            amount: parseFloat(amount)
        };
    }
}
