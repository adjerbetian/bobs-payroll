import * as moment from "moment";
import { PaymentDependencies } from "../../domain";
import { isoDate } from "../../utils";
import { MongoDbAdapter } from "../databases";
import { PaymentDBModel } from "../DBModels";
import { paymentMapper } from "../mappers";

const NEVER = isoDate(moment(0));

export function makeMongoPaymentRepository(
    db: MongoDbAdapter<PaymentDBModel>
): PaymentDependencies["paymentRepository"] {
    return {
        async fetchLastOfEmployee(employeeId) {
            const dbModel = await db.fetchLast({ employeeId });
            return paymentMapper.toEntity(dbModel);
        },
        async fetchEmployeeLastPaymentDate(employeeId) {
            if (await db.exists({ employeeId })) {
                const payment = await db.fetchLast({ employeeId });
                return payment.date;
            } else {
                return NEVER;
            }
        },
        async insert(payment) {
            await db.insert(paymentMapper.toDBModel(payment));
        }
    };
}
