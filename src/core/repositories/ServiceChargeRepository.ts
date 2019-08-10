import { ServiceCharge } from "../entities";

export interface ServiceChargeRepository {
    fetchAll(): Promise<ServiceCharge[]>;
    fetchAllOfMember(memberId: string): Promise<ServiceCharge[]>;
    insertOne(serviceCharge: ServiceCharge): Promise<void>;
}
