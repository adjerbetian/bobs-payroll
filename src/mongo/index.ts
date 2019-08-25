import { dbEmployees } from "./db";
import { buildMongoEmployeeRepository } from "./repositories";

export { initConnection, closeConnection, cleanCollections } from "./db";
export { MongoDbAdapter } from "./mongoDbAdapter";

export {
    mongoTimeCardRepository,
    mongoSalesReceiptRepository,
    mongoServiceChargeRepository,
    mongoPaymentMethodRepository,
    mongoUnionMemberRepository
} from "./repositories";

export const mongoEmployeeRepository = buildMongoEmployeeRepository(dbEmployees);
