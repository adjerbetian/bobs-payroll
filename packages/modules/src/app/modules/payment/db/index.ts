import { dbPayments } from "./collections";
import { makeMongoPaymentRepository } from "./repositories";

export { dbPayments } from "./collections";
export const mongoPaymentRepository = makeMongoPaymentRepository(dbPayments);
