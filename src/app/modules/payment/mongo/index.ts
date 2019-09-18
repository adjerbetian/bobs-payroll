import { dbPayments } from "./databases";
import { makeMongoPaymentRepository } from "./repositories";

export { dbPayments } from "./databases";
export const mongoPaymentRepository = makeMongoPaymentRepository(dbPayments);
