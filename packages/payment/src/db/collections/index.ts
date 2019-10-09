import { buildDatabase } from "@payroll/mongo";
import { NotFoundError } from "@payroll/core";
import { paymentMapper } from "../mappers";

export const dbPayments = buildDatabase("payments", paymentMapper, NotFoundError);
