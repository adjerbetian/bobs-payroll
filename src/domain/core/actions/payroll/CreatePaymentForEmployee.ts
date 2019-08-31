import { Payment } from "../../entities";

export type CreatePaymentForEmployee = (basicPayment: Omit<Payment, "method">) => Promise<void>;
