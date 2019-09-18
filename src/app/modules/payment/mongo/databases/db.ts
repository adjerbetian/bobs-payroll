import { buildDatabase } from "../../../../mongo";
import { paymentMapper } from "../mappers";

export const dbPayments = buildDatabase("payments", paymentMapper);
