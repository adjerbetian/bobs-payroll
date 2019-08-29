import { Payment } from "../entities";

export interface PaymentRepository {
    fetchLastOfEmployee(employeeId: number): Promise<Payment>;
    fetchEmployeeLastPaymentDate(employeeId: number): Promise<string>;
    insert(payment: Payment): Promise<void>;
}
