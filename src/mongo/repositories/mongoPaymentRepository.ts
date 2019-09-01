import * as moment from "moment";
import { Payment, PaymentDependencies } from "../../domain";
import { isoDate } from "../../utils";
import { MongoDbAdapter } from "../mongoDbAdapter";

const NEVER = isoDate(moment(0));

export function buildMongoPaymentRepository(db: MongoDbAdapter<Payment>): PaymentDependencies["paymentRepository"] {
    return {
        async fetchLastOfEmployee(employeeId: number): Promise<Payment> {
            return db.fetchLast({ employeeId });
        },
        async fetchEmployeeLastPaymentDate(employeeId: number): Promise<string> {
            if (await db.exists({ employeeId })) {
                const payment = await db.fetchLast({ employeeId });
                return payment.date;
            } else {
                return NEVER;
            }
        },
        async insert(payment: Payment): Promise<void> {
            await db.insert(payment);
        }
    };
}
