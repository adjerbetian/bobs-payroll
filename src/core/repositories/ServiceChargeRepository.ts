import { ServiceCharge } from "../entities";

export interface ServiceChargeRepository {
    fetchAllOfEmployee(employeeId: number): Promise<ServiceCharge[]>;
    insertOne(serviceCharge: ServiceCharge): Promise<void>;
}
