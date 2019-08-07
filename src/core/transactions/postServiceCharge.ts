import { ServiceCharge } from "../entities";
import { ServiceChargeRepository } from "../repositories";
import { Transaction } from "./Transactions";

interface Dependencies {
    serviceChargeRepository: ServiceChargeRepository;
}

export function buildPostServiceChargeTransaction({
    serviceChargeRepository
}: Dependencies): Transaction {
    return async function(employeeId: string, amount: string): Promise<void> {
        // assertTransactionValid(employeeId, date, hours);
        // await assertEmployeeIsInHourlyRate(employeeId);

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
    // async function assertEmployeeIsInHourlyRate(employeeId: string): Promise<void> {
    //     const employee = await employeeRepository.fetchEmployeeById(parseInt(employeeId));
    //     if (employee.type !== EmployeeType.HOURLY_RATE) {
    //         throw new EmployeeTypeError(employee, EmployeeType.HOURLY_RATE);
    //     }
    // }

    function buildServiceCharge(employeeId: string, amount: string): ServiceCharge {
        return {
            employeeId: parseInt(employeeId),
            amount: parseFloat(amount)
        };
    }
}
