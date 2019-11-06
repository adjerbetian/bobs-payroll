import { buildDatabase } from "@infra/mongo";
import { NotFoundError } from "@modules/core";
import { paymentMapper } from "../mappers";

export const dbPayments = buildDatabase("payments", paymentMapper, NotFoundError);
