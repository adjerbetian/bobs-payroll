import { buildDatabase } from "../../../../mongo";
import { NotFoundError } from "../../domain";
import {
    employeeMapper,
    paymentMethodMapper,
    salesReceiptMapper,
    serviceChargeMapper,
    timeCardMapper,
    unionMembershipMapper
} from "../mappers";

export const dbEmployees = buildDatabase("employees", employeeMapper, NotFoundError);
export const dbTimeCards = buildDatabase("time-cards", timeCardMapper, NotFoundError);
export const dbSalesReceipts = buildDatabase("sales-receipts", salesReceiptMapper, NotFoundError);
export const dbServiceCharges = buildDatabase("service-charges", serviceChargeMapper, NotFoundError);
export const dbPaymentMethods = buildDatabase("payment-methods", paymentMethodMapper, NotFoundError);
export const dbUnionMembers = buildDatabase("union-members", unionMembershipMapper, NotFoundError);
