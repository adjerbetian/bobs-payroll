import { Payment, PaymentRepository } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";

export function buildMongoPaymentRepository(db: MongoDbAdapter<Payment>): PaymentRepository {
    return {
        async fetchLastOfEmployee(employeeId: number): Promise<Payment> {
            return db.fetchLast({ employeeId });
        }
    };
}
