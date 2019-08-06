import { ServiceCharge } from "../entities/ServiceCharge";

export interface ServiceChargeRepository {
    fetchAllOfEmployee(employeeId: number): Promise<ServiceCharge[]>;
    insertOne(serviceCharge: ServiceCharge): Promise<void>;
}
