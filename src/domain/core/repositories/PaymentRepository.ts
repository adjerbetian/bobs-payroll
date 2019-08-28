import { Payment } from "../entities";

export interface PaymentRepository {
    fetchLastOfEmployee(employeeId: number): Promise<Payment>;
}
