import { Payment, PaymentRepository } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";

export function buildMongoPaymentRepository(db: MongoDbAdapter<Payment>): PaymentRepository {
    return {
        async fetchLastOfEmployee(employeeId: number): Promise<Payment> {
            return db.fetchLast({ employeeId });
        },
        async fetchEmployeeLastPaymentDate(employeeId: number): Promise<string> {
            throw new Error("todo");
        },
        async insert(payment: Payment): Promise<void> {
            throw new Error("todo");
        }
    };
}
