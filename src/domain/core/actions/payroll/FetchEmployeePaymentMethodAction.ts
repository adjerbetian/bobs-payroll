import { PaymentMethod } from "../../entities";

export type FetchEmployeePaymentMethodAction = (employeeId: number) => Promise<PaymentMethod>;
