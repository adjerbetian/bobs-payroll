import { dbEmployees } from "./db";
import { buildMongoEmployeeRepository } from "./mongoEmployeeRepository";

export { initConnection, closeConnection, cleanCollections } from "./db";
export { mongoTimeCardRepository } from "./mongoTimeCardRepository";
export { mongoSalesReceiptRepository } from "./mongoSalesReceiptRepository";
export { mongoServiceChargeRepository } from "./mongoServiceChargeRepository";
export { mongoPaymentMethodRepository } from "./mongoPaymentMethodRepository";
export { mongoUnionMemberRepository } from "./mongoUnionMemberRepository";
export { MongoDbAdapter } from "./mongoDbAdapter";

export const mongoEmployeeRepository = buildMongoEmployeeRepository(dbEmployees);
