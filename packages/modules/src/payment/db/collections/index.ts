import { buildDatabase } from "@bobs-payroll/mongo";
import { NotFoundError } from "../../../core";
import { paymentMapper } from "../mappers";

export const dbPayments = buildDatabase("payments", paymentMapper, NotFoundError);
