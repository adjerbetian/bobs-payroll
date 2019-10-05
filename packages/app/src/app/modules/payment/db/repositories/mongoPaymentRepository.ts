import { MongoEntity } from "@bobs-payroll/mongo";
import * as moment from "moment";
import { isoDate } from "../../../../../utils";
import { Payment, PaymentRepository } from "../../domain";
import { PaymentDBModel } from "../DBModels";

const NEVER = isoDate(moment(0));

export function makeMongoPaymentRepository(db: MongoEntity<Payment, PaymentDBModel>): PaymentRepository {
    return {
        async fetchLastOfEmployee(employeeId) {
            return db.fetchLast({ employeeId });
        },
        async fetchEmployeeLastPaymentDate(employeeId) {
            if (await db.exists({ employeeId })) {
                const payment = await db.fetchLast({ employeeId });
                return payment.getDate();
            } else {
                return NEVER;
            }
        },
        async insert(payment) {
            await db.insert(payment);
        }
    };
}
