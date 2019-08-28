import { Payment } from "../entities";

export interface PaymentRepository {
    fetchLastOfEmployee(employeeId: number): Promise<Payment>;
    insert(payment: Payment): Promise<void>;
}
