import { µ } from "@common/micro";
import { MongoEntity } from "@infra/mongo";
import * as moment from "moment";
import { Payment, PaymentRepository } from "../../domain";
import { PaymentDBModel } from "../DBModels";

const NEVER = µ.isoDate(moment(0));

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
