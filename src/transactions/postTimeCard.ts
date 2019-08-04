import { Transaction } from "./Transactions";
import { TimeCardRepository } from "../repositories";

export function buildPostTimeCardTransaction(timeCardRepository: TimeCardRepository): Transaction {
    return async function(employeeId: string, date: string, hours: string): Promise<void> {
        await timeCardRepository.insertOne({
            employeeId: parseInt(employeeId),
            date: date,
            hours: parseFloat(hours)
        });
    };
}
