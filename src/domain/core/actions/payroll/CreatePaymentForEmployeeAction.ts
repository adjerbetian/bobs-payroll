import { Payment } from "../../entities";

export type CreatePaymentForEmployeeAction = (basicPayment: Omit<Payment, "method">) => Promise<void>;
